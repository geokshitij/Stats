
import { Distribution } from '../types';

export const MathUtils = {
    // Lanczos approximation for the Gamma function Γ(z)
    gamma: (z: number): number => {
        const g = 7;
        const p = [
            0.99999999999980993, 676.5203681218851, -1259.1392167224028,
            771.32342877765313, -176.61502916214059, 12.507343278686905,
            -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
        ];
        if (z < 0.5) {
            return Math.PI / (Math.sin(Math.PI * z) * MathUtils.gamma(1 - z));
        }
        z -= 1;
        let x = p[0];
        for (let i = 1; i < g + 2; i++) {
            x += p[i] / (z + i);
        }
        const t = z + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
    },
    
    // Error function (erf) approximation for Normal CDF
    erf: (x: number): number => {
        const a1 = 0.254829592;
        const a2 = -0.284496736;
        const a3 = 1.421413741;
        const a4 = -1.453152027;
        const a5 = 1.061405429;
        const p = 0.3275911;
        const sign = x >= 0 ? 1 : -1;
        x = Math.abs(x);
        const t = 1.0 / (1.0 + p * x);
        const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
        return sign * y;
    },
    
    // Standard Normal CDF
    normalCdf: (x: number): number => {
        return 0.5 * (1 + MathUtils.erf(x / Math.sqrt(2)));
    },

    // Inverse of the standard normal CDF (probit function) using Abramowitz and Stegun approximation.
    normalQuantile: (p: number): number => {
        if (p <= 0) return -Infinity;
        if (p >= 1) return Infinity;

        const c = [2.515517, 0.802853, 0.010328];
        const d = [1.432788, 0.189269, 0.001308];
        
        let t;
        if (p < 0.5) {
            t = Math.sqrt(-2.0 * Math.log(p));
            const num = c[0] + c[1] * t + c[2] * t * t;
            const den = 1 + d[0] * t + d[1] * t * t + d[2] * t * t * t;
            return -(t - num / den);
        } else {
            t = Math.sqrt(-2.0 * Math.log(1.0 - p));
            const num = c[0] + c[1] * t + c[2] * t * t;
            const den = 1 + d[0] * t + d[1] * t * t + d[2] * t * t * t;
            return t - num / den;
        }
    },
    
    // Generate a sample of a given size from a distribution
    generateSample: (dist: Distribution, params: { [key: string]: number }, size: number): number[] => {
        const paramValues = dist.parameters.map(p => params[p.id]);
        const sample = [];
        for (let i = 0; i < size; i++) {
            sample.push(dist.randomVariate(...paramValues));
        }
        return sample.sort((a, b) => a - b);
    },

    // Calculate the Empirical CDF from a data sample
    calculateEcdf: (sample: number[]): { x: number; cdf: number }[] => {
        const ecdfPoints: { x: number; cdf: number }[] = [];
        if (sample.length === 0) return [];
        
        ecdfPoints.push({ x: sample[0] - 1, cdf: 0 }); // Start from 0
        
        for (let i = 0; i < sample.length; i++) {
            const cdf = (i + 1) / sample.length;
            if (i > 0 && sample[i] === sample[i - 1]) {
                ecdfPoints[ecdfPoints.length - 1].cdf = cdf; // Update previous point if duplicate value
            } else {
                 if (i > 0) {
                     ecdfPoints.push({ x: sample[i], cdf: (i) / sample.length });
                 }
                ecdfPoints.push({ x: sample[i], cdf: cdf });
            }
        }
        ecdfPoints.push({ x: sample[sample.length - 1] + 1, cdf: 1 });
        return ecdfPoints;
    },
    
    // Calculate quantiles for a Q-Q plot
    calculateQuantiles: (sample: number[]): { sampleQuantile: number; theoreticalQuantile: number }[] => {
        const quantiles = [];
        const n = sample.length;
        for (let i = 0; i < n; i++) {
            const p = (i + 1 - 0.5) / n; // Using rankit formula
            quantiles.push({
                sampleQuantile: sample[i],
                theoreticalQuantile: MathUtils.normalQuantile(p),
            });
        }
        return quantiles;
    },
    
    // Beta function
    beta: (a: number, b: number): number => {
        return (MathUtils.gamma(a) * MathUtils.gamma(b)) / MathUtils.gamma(a + b);
    },

    // F-distribution Probability Density Function (PDF)
    fDistPdf: (x: number, d1: number, d2: number): number => {
        if (x <= 0 || d1 <= 0 || d2 <= 0) return 0;
        const term1 = Math.pow((d1 * x) / (d1 * x + d2), d1 / 2);
        const term2 = Math.pow(d2 / (d1 * x + d2), d2 / 2);
        return (term1 * term2) / (x * MathUtils.beta(d1 / 2, d2 / 2));
    },

    // F-distribution Cumulative Distribution Function (CDF) via numerical integration
    fDistCdf: (x: number, d1: number, d2: number): number => {
        if (x <= 0) return 0;
        // Simple trapezoidal rule integration
        const integrate = (f: (t: number) => number, a: number, b: number, n: number = 200): number => {
            const h = (b - a) / n;
            let sum = 0.5 * (f(a) + f(b));
            for (let i = 1; i < n; i++) {
                sum += f(a + i * h);
            }
            return sum * h;
        };
        const pdf = (t: number) => MathUtils.fDistPdf(t, d1, d2);
        return integrate(pdf, 0.0001, x);
    },

    // F-distribution quantile function (inverse CDF) using bisection method
    fDistQuantile: (p: number, d1: number, d2: number): number => {
        if (p <= 0) return 0;
        if (p >= 1) return Infinity;

        let lower = 0;
        let upper = 20; // Initial guess for upper bound

        // Find a reasonable upper bound
        try {
            while (MathUtils.fDistCdf(upper, d1, d2) < p) {
                lower = upper;
                upper *= 2;
                if (upper > 1e6) break; // Safety break
            }
        } catch(e) {
            return NaN; // Return NaN if integration fails
        }


        let mid;
        for (let i = 0; i < 50; i++) { // 50 iterations for good precision
            mid = (lower + upper) / 2;
            try {
                if (MathUtils.fDistCdf(mid, d1, d2) < p) {
                    lower = mid;
                } else {
                    upper = mid;
                }
            } catch(e) {
                return NaN;
            }
        }
        return upper;
    },
};
