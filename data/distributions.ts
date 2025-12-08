
import React from 'react';
import { Distribution, Parameter } from '../types';

// =============================================================================
// MATHEMATICAL HELPER FUNCTIONS
// =============================================================================

const factorial = (num: number): number => {
    num = Math.floor(num);
    if (num < 0) return Infinity;
    if (num === 0) return 1;
    let result = 1;
    for (let i = num; i > 0; i--) {
        result *= i;
    }
    return result;
};

const combinations = (n: number, k: number): number => {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    if (k > n / 2) k = n - k;
    let res = 1;
    for (let i = 1; i <= k; i++) {
        res = res * (n - i + 1) / i;
    }
    return res;
};

// Lanczos approximation for the Gamma function Γ(z)
const gamma = (z: number): number => {
    const g = 7;
    const p = [
        0.99999999999980993, 676.5203681218851, -1259.1392167224028,
        771.32342877765313, -176.61502916214059, 12.507343278686905,
        -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
    ];
    if (z < 0.5) {
        return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    }
    z -= 1;
    let x = p[0];
    for (let i = 1; i < g + 2; i++) {
        x += p[i] / (z + i);
    }
    const t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
};

// Error function (erf) approximation for Normal CDF
const erf = (x: number): number => {
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
};

// Numerically integrate a function using the trapezoidal rule.
const integrate = (f: (t: number) => number, a: number, b: number, n: number = 100): number => {
    const h = (b - a) / n;
    let sum = 0.5 * (f(a) + f(b));
    for (let i = 1; i < n; i++) {
        sum += f(a + i * h);
    }
    return sum * h;
};

// =============================================================================
// RANDOM VARIATE GENERATORS
// =============================================================================
const randomBinomial = (n: number, p: number): number => {
    let successes = 0;
    for (let i = 0; i < n; i++) {
        if (Math.random() < p) {
            successes++;
        }
    }
    return successes;
};

const randomGeometric = (p: number): number => {
    return Math.floor(Math.log(1.0 - Math.random()) / Math.log(1.0 - p)) + 1;
};

const randomNegativeBinomial = (r: number, p: number): number => {
    let successes = 0;
    let trials = 0;
    while (successes < r) {
        trials++;
        if (Math.random() < p) {
            successes++;
        }
    }
    return trials;
};

// Using Knuth's algorithm for Poisson
const randomPoisson = (lambda: number): number => {
    let L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
        k++;
        p *= Math.random();
    } while (p > L);
    return k - 1;
};

// Box-Muller transform for standard normal
const randomGaussian = (mu: number, sigma: number): number => {
    let u1, u2;
    do {
        u1 = Math.random();
    } while (u1 === 0);
    do {
        u2 = Math.random();
    } while (u2 === 0);
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * sigma + mu;
};

// Marsaglia and Tsang's method for Gamma distribution
const randomGamma = (alpha: number, beta: number): number => {
    if (alpha < 1) {
        return randomGamma(alpha + 1, beta) * Math.pow(Math.random(), 1 / alpha);
    }
    const d = alpha - 1 / 3;
    const c = 1 / Math.sqrt(9 * d);
    let v, x, x_squared;
    while (true) {
        do {
            x = randomGaussian(0, 1);
            v = 1 + c * x;
        } while (v <= 0);
        v = v * v * v;
        x_squared = x * x;
        const u = Math.random();
        if (u < 1 - 0.0331 * x_squared * x_squared) return (d * v * beta);
        if (Math.log(u) < 0.5 * x_squared + d * (1 - v + Math.log(v))) return (d * v * beta);
    }
};

// Inverse Transform Sampling for GEV and GP
const randomGEV = (xi: number, mu: number, sigma: number): number => {
    const u = Math.random();
    if (Math.abs(xi) < 1e-6) { // Gumbel case
        return mu - sigma * Math.log(-Math.log(u));
    }
    return mu + sigma * (Math.pow(-Math.log(u), -xi) - 1) / xi;
};

const randomGP = (xi: number, sigma: number): number => {
    const u = Math.random();
    if (Math.abs(xi) < 1e-6) { // Exponential case
        return -sigma * Math.log(1 - u);
    }
    return sigma * (Math.pow(1 - u, -xi) - 1) / xi;
};


// =============================================================================
// PDF/PMF AND CDF GENERATORS
// =============================================================================
const generateBinomialData = (n: number, p: number): { x: number; probability: number }[] => {
  const data = [];
  for (let k = 0; k <= n; k++) {
    const probability = combinations(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    data.push({ x: k, probability: parseFloat(probability.toFixed(4)) });
  }
  return data;
};
const cdfBinomial = (n: number, p: number): { x: number; cdf: number }[] => {
    const data = [];
    let cumulative = 0;
    for (let k = 0; k <= n; k++) {
        cumulative += combinations(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
        data.push({ x: k, cdf: parseFloat(cumulative.toFixed(4)) });
    }
    return data;
};

const generateGeometricData = (p: number): { x: number; probability: number }[] => {
  const data = [];
  const limit = Math.max(20, Math.min(50, Math.ceil(5/p)));
  for (let k = 1; k <= limit; k++) {
    const probability = p * Math.pow(1 - p, k - 1);
    data.push({ x: k, probability: parseFloat(probability.toFixed(4)) });
    if (probability < 0.0001 && k > 10) break;
  }
  return data;
};
const cdfGeometric = (p: number): { x: number; cdf: number }[] => {
    const data = [];
    const limit = Math.max(20, Math.min(50, Math.ceil(5/p)));
    for (let k = 1; k <= limit; k++) {
        const cdf = 1 - Math.pow(1 - p, k);
        data.push({ x: k, cdf: parseFloat(cdf.toFixed(4)) });
        if (cdf > 0.9999) break;
    }
    return data;
};


const generateNegativeBinomialData = (r: number, p: number): { x: number; probability: number }[] => {
    const data = [];
    const limit = Math.max(r+10, Math.min(r+50, Math.ceil( (r/p) + 4 * Math.sqrt(r*(1-p))/(p*p) ) ));
    for (let k = r; k <= limit; k++) {
        const failures = k - r;
        const probability = combinations(k - 1, r - 1) * Math.pow(p, r) * Math.pow(1 - p, failures);
        data.push({ x: k, probability: parseFloat(probability.toFixed(4)) });
        if (probability < 0.0001 && k > r + 10) break;
    }
    return data;
};
const cdfNegativeBinomial = (r: number, p: number): { x: number; cdf: number }[] => {
    const data = [];
    let cumulative = 0;
    const limit = Math.max(r+10, Math.min(r+50, Math.ceil( (r/p) + 4 * Math.sqrt(r*(1-p))/(p*p) ) ));
     for (let k = r; k <= limit; k++) {
        const failures = k - r;
        cumulative += combinations(k - 1, r - 1) * Math.pow(p, r) * Math.pow(1 - p, failures);
        data.push({ x: k, cdf: parseFloat(cumulative.toFixed(4)) });
        if (cumulative > 0.9999) break;
    }
    return data;
};

const generatePoissonData = (lambda: number): { x: number; probability: number }[] => {
    const data = [];
    const limit = Math.max(15, Math.ceil(lambda + 5 * Math.sqrt(lambda)));
    for (let k = 0; k <= limit; k++) {
        const probability = (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
        data.push({ x: k, probability: parseFloat(probability.toFixed(4)) });
         if (probability < 0.0001 && k > lambda) break;
    }
    return data;
};
const cdfPoisson = (lambda: number): { x: number; cdf: number }[] => {
    const data = [];
    let cumulative = 0;
    const limit = Math.max(15, Math.ceil(lambda + 5 * Math.sqrt(lambda)));
    for (let k = 0; k <= limit; k++) {
        cumulative += (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
        data.push({ x: k, cdf: parseFloat(cumulative.toFixed(4)) });
        if (cumulative > 0.9999) break;
    }
    return data;
};


const generateGaussianData = (mu: number, sigma: number): { x: number; density: number }[] => {
    const data = [];
    const points = 100;
    const step = (sigma * 8) / points;
    for (let i = -sigma * 4; i <= sigma * 4; i += step) {
        const x = mu + i;
        const density = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
        data.push({ x: parseFloat(x.toFixed(2)), density: parseFloat(density.toFixed(4)) });
    }
    return data;
};
const cdfGaussian = (mu: number, sigma: number): { x: number, cdf: number }[] => {
    const data = [];
    const points = 100;
    const step = (sigma * 8) / points;
     for (let i = -sigma * 4; i <= sigma * 4; i += step) {
        const x = mu + i;
        const cdf = 0.5 * (1 + erf((x - mu) / (sigma * Math.sqrt(2))));
        data.push({ x: parseFloat(x.toFixed(2)), cdf: parseFloat(cdf.toFixed(4)) });
    }
    return data;
};

const generateGammaData = (alpha: number, beta: number): { x: number, density: number }[] => {
    const data = [];
    const points = 100;
    const max_x = alpha * beta + 5 * Math.sqrt(alpha * beta * beta);
    const step = max_x / points;
    if (max_x <= 0 || !isFinite(max_x)) return [];
    const pdf = (x: number) => (Math.pow(x, alpha - 1) * Math.exp(-x / beta)) / (Math.pow(beta, alpha) * gamma(alpha));
    for (let x = step; x <= max_x; x+= step) {
        if (x <= 0) continue;
        data.push({ x: parseFloat(x.toFixed(2)), density: parseFloat(pdf(x).toFixed(4)) });
    }
    return data;
};
const cdfGamma = (alpha: number, beta: number): { x: number; cdf: number }[] => {
    const data = [];
    const points = 100;
    const max_x = alpha * beta + 5 * Math.sqrt(alpha * beta * beta);
    const step = max_x / points;
    if (max_x <= 0 || !isFinite(max_x)) return [];
    const pdf = (t: number) => (Math.pow(t, alpha - 1) * Math.exp(-t / beta)) / (Math.pow(beta, alpha) * gamma(alpha));
    for (let x = step; x <= max_x; x += step) {
        const cdf = integrate(pdf, 0, x);
        data.push({ x: parseFloat(x.toFixed(2)), cdf: parseFloat(cdf.toFixed(4)) });
    }
    return data;
};

const generateGEVData = (xi: number, mu: number, sigma: number): { x: number, density: number }[] => {
    const data = [];
    const points = 100;
    const range = sigma * 8;
    const step = range / points;
    const startX = mu - range/2;
    for(let i = 0; i <= points; i++) {
        const x = startX + i * step;
        let t, density;
        if (Math.abs(xi) > 1e-6) {
            const xi_val = 1 + xi * ((x - mu) / sigma);
            if (xi_val <= 0) continue;
            t = Math.pow(xi_val, -1 / xi);
        } else {
            t = Math.exp(-(x - mu) / sigma);
        }
        density = (1 / sigma) * Math.pow(t, xi+1) * Math.exp(-t);
        if (isFinite(density)) {
            data.push({ x: parseFloat(x.toFixed(2)), density: parseFloat(density.toFixed(4)) });
        }
    }
    return data;
};
const cdfGEV = (xi: number, mu: number, sigma: number): { x: number; cdf: number }[] => {
    const data = [];
    const points = 100;
    const range = sigma * 8;
    const step = range / points;
    const startX = mu - range/2;
    for(let i = 0; i <= points; i++) {
        const x = startX + i * step;
        let cdf;
         if (Math.abs(xi) > 1e-6) {
            const xi_val = 1 + xi * ((x - mu) / sigma);
            if (xi_val <= 0) continue;
            cdf = Math.exp(-Math.pow(xi_val, -1 / xi));
        } else {
            cdf = Math.exp(-Math.exp(-(x - mu) / sigma));
        }
        if(isFinite(cdf)) {
           data.push({ x: parseFloat(x.toFixed(2)), cdf: parseFloat(cdf.toFixed(4)) });
        }
    }
    return data;
};


const generateGPData = (xi: number, sigma: number): { x: number, density: number }[] => {
    const data = [];
    const points = 100;
    const range = sigma * 5;
    const step = range / points;
    if (sigma <= 0) return [];
    for(let x = 0; x <= range; x += step) {
        if (xi < 0 && x > -sigma/xi) break; // Check for upper bound
        const term = 1 + (xi * x) / sigma;
        if (term <= 0) continue;
        const density = (1/sigma) * Math.pow(term, - (1/xi + 1));
        if(isFinite(density)) {
            data.push({ x: parseFloat(x.toFixed(2)), density: parseFloat(density.toFixed(4)) });
        }
    }
    return data;
};
const cdfGP = (xi: number, sigma: number): { x: number; cdf: number }[] => {
    const data = [];
    const points = 100;
    const range = sigma * 5;
    const step = range / points;
    if (sigma <= 0) return [];
    for(let x = 0; x <= range; x += step) {
        if (xi < 0 && x > -sigma/xi) {
             data.push({ x: parseFloat(x.toFixed(2)), cdf: 1 });
             break;
        }
        const term = 1 + (xi * x) / sigma;
        if (term <= 0) continue;
        const cdf = 1 - Math.pow(term, -1/xi);
        if(isFinite(cdf)){
           data.push({ x: parseFloat(x.toFixed(2)), cdf: parseFloat(cdf.toFixed(4)) });
        }
    }
    return data;
};



export const distributions: Distribution[] = [
  {
    id: 'binomial',
    name: 'Binomial Distribution',
    formula: React.createElement('p', { className: "text-xl font-mono" },
      "Pr(X=x) = C(N,x) p", React.createElement("sup", null, "x"), " (1-p)", React.createElement("sup", null, "N-x")
    ),
    summary: "Counts successes in a fixed number of 'yes/no' trials.",
    explanation: "The Binomial distribution models the number of 'successes' in a fixed number of independent trials, where each trial has only two possible outcomes (e.g., success/failure, heads/tails). In this context, Pr(X=x) is the probability of observing exactly 'x' successes in 'N' trials. 'X' is the random variable representing the total count of successes, and 'x' is a specific number of successes you're interested in.",
    conditions: [
      "Fixed number of trials (N).",
      "Each trial is independent.",
      "Only two outcomes per trial.",
      "The probability of success (p) is constant for each trial."
    ],
    realWorldExamples: [
        "Number of heads in 15 coin flips.",
        "Number of defective items in a batch of 50.",
        "Number of patients responding to a new drug out of 100 participants."
    ],
    keyTakeaways: [
        "Remember BINS: Binary outcomes, Independent trials, Number of trials fixed, Success probability constant.",
        "It's a discrete distribution – you can't have 2.5 successes.",
        "Answers: 'How many times?' out of a set number of opportunities."
    ],
    dataGenerator: generateBinomialData,
    cdfGenerator: cdfBinomial,
    randomVariate: randomBinomial,
    parameters: [
      { id: 'n', name: 'N (Trials)', min: 1, max: 50, step: 1, defaultValue: 10 },
      { id: 'p', name: 'p (Probability)', min: 0.01, max: 0.99, step: 0.01, defaultValue: 0.5 }
    ],
    graphType: 'bar',
    xAxisKey: 'x',
    yAxisKey: 'probability',
    xAxisLabel: 'Number of Successes (x)',
    yAxisLabel: 'Probability',
  },
  {
    id: 'geometric',
    name: 'Geometric Distribution',
    formula: React.createElement('p', { className: "text-xl font-mono" },
      "Pr(X=x) = p(1-p)", React.createElement("sup", null, "x-1")
    ),
    summary: "Counts trials until the very first success occurs.",
    explanation: "The Geometric distribution models the number of trials needed to get the first success in a series of independent Bernoulli trials. Here, Pr(X=x) is the probability that the very first success occurs on the 'x'-th trial. 'X' is the random variable for the trial number of the first success, and 'x' is that specific trial number.",
    conditions: [
      "Trials are independent.",
      "Only two outcomes per trial (success/failure).",
      "The probability of success (p) is constant.",
      "The variable of interest is the number of trials until the first success."
    ],
    realWorldExamples: [
        "Number of coin flips until you get the first heads.",
        "Number of times you roll a die until you get the first '6'.",
        "Number of sales calls a telemarketer makes to get their first sale."
    ],
    keyTakeaways: [
        "It's the 'waiting time' distribution for the first success.",
        "Memoryless property: The fact that you haven't succeeded yet doesn't change your future probability of success.",
        "Answers: 'How long until the first time?'"
    ],
    dataGenerator: generateGeometricData,
    cdfGenerator: cdfGeometric,
    randomVariate: randomGeometric,
    parameters: [
      { id: 'p', name: 'p (Probability)', min: 0.01, max: 0.99, step: 0.01, defaultValue: 0.3 }
    ],
    graphType: 'bar',
    xAxisKey: 'x',
    yAxisKey: 'probability',
    xAxisLabel: 'Number of Trials until First Success (x)',
    yAxisLabel: 'Probability',
  },
   {
    id: 'negative-binomial',
    name: 'Negative Binomial Distribution',
    formula: React.createElement('p', { className: "text-xl font-mono" }, "Pr(X=x) = C(x-1, r-1) p", React.createElement("sup", null, "r"), "(1-p)", React.createElement("sup", null, "x-r")),
    summary: "Counts trials until a fixed number of successes occur.",
    explanation: "A generalization of the Geometric distribution. It models the number of trials required to achieve a fixed number of successes (r). Pr(X=x) is the probability that the r-th success occurs on trial 'x'. 'X' is the random variable for the trial number of the r-th success, and 'x' is that specific trial number.",
    conditions: [
      "Trials are independent with two outcomes.",
      "Probability of success (p) is constant.",
      "We continue trials until we reach a specific number of successes (r)."
    ],
    realWorldExamples: [
        "Number of coin flips to get 3 heads.",
        "Number of products a QA inspector checks to find 5 defective items.",
        "Number of fish someone needs to catch to bring home 10 keepers."
    ],
    keyTakeaways: [
        "If you need just 1 success (r=1), it's a Geometric distribution.",
        "It's like running multiple 'Geometric' experiments back-to-back.",
        "Answers: 'How long until the r-th time?'"
    ],
    dataGenerator: generateNegativeBinomialData,
    cdfGenerator: cdfNegativeBinomial,
    randomVariate: randomNegativeBinomial,
    parameters: [
        { id: 'r', name: 'r (Successes)', min: 1, max: 20, step: 1, defaultValue: 3 },
        { id: 'p', name: 'p (Probability)', min: 0.01, max: 0.99, step: 0.01, defaultValue: 0.4 }
    ],
    graphType: 'bar',
    xAxisKey: 'x',
    yAxisKey: 'probability',
    xAxisLabel: 'Trials until r-th Success (x)',
    yAxisLabel: 'Probability',
  },
  {
    id: 'poisson',
    name: 'Poisson Distribution',
    formula: React.createElement('p', { className: "text-xl font-mono" },
      "Pr(X=x) = (λ", React.createElement("sup", null, "x"), "e", React.createElement("sup", null, "-λ"), ") / x!"
    ),
    summary: "Counts events occurring in a fixed interval of time or space.",
    explanation: "The Poisson distribution models the number of events occurring within a fixed interval of time or space, given the average rate (λ) of occurrence. Pr(X=x) is the probability of exactly 'x' events happening in that interval. 'X' is the random variable for the count of events, and 'x' is the specific count you are testing.",
    conditions: [
        "Events occur independently.",
        "The average rate (λ) at which events occur is constant.",
        "Two events cannot occur at exactly the same instant."
    ],
    realWorldExamples: [
        "Number of emails you receive in an hour.",
        "Number of cars passing a point on a highway in a minute.",
        "Number of typos on a page of a book."
    ],
    keyTakeaways: [
        "Think about rates. If you have an average rate (λ), Poisson can tell you the probability of seeing 0, 1, 2, ... events in that interval.",
        "It's discrete. You can get 3 emails, but not 3.5 emails.",
        "Answers: 'How many occurrences?' in a given interval."
    ],
    dataGenerator: generatePoissonData,
    cdfGenerator: cdfPoisson,
    randomVariate: randomPoisson,
    parameters: [
      { id: 'lambda', name: 'λ (Average Rate)', min: 0.1, max: 20, step: 0.1, defaultValue: 3 }
    ],
    graphType: 'bar',
    xAxisKey: 'x',
    yAxisKey: 'probability',
    xAxisLabel: 'Number of Events (x)',
    yAxisLabel: 'Probability',
  },
  {
    id: 'gaussian',
    name: 'Gaussian (Normal) Distribution',
    formula: React.createElement('div', { className: "text-xl font-mono flex items-center" },
      "f(x) = ",
      React.createElement("div", { className: "frac mx-2" }, React.createElement("span", null, "1"), React.createElement("span", { className: "symbol" }, "/"), React.createElement("span", { className: "bottom" }, "σ√2π")),
      " exp[ -",
      React.createElement("div", { className: "frac mx-2" }, React.createElement("span", null, "(x-μ)", React.createElement("sup", null, "2")), React.createElement("span", { className: "symbol" }, "/"), React.createElement("span", { className: "bottom" }, "2σ", React.createElement("sup", null, "2"))),
      " ]"
    ),
    summary: "The classic 'bell curve' for continuous data centered around an average.",
    explanation: "The Gaussian or Normal distribution is a continuous probability distribution. Its formula, f(x), gives the Probability Density Function, not a direct probability. The probability of the random variable 'X' falling within a range is the area under the curve in that range. 'X' is the continuous random variable (e.g., height), and 'x' is a specific value of that variable.",
    conditions: [
        "Models continuous random variables.",
        "Data is symmetric around the mean, with most values clustering in the center.",
        "It's defined by its mean (μ) and standard deviation (σ)."
    ],
    realWorldExamples: [
        "Heights or blood pressure of a population.",
        "Measurement errors in an experiment.",
        "IQ scores."
    ],
    keyTakeaways: [
        "The most famous distribution. When in doubt, things in nature often follow it.",
        "It's a continuous distribution.",
        "The 68-95-99.7 rule: about 68% of data falls within 1 standard deviation of the mean, 95% within 2, and 99.7% within 3."
    ],
    dataGenerator: generateGaussianData,
    cdfGenerator: cdfGaussian,
    randomVariate: randomGaussian,
    parameters: [
        { id: 'mu', name: 'μ (Mean)', min: -10, max: 10, step: 0.5, defaultValue: 0 },
        { id: 'sigma', name: 'σ (Std. Dev.)', min: 0.1, max: 10, step: 0.1, defaultValue: 1 }
    ],
    graphType: 'line',
    xAxisKey: 'x',
    yAxisKey: 'density',
    xAxisLabel: 'Value (x)',
    yAxisLabel: 'Probability Density',
  },
  {
    id: 'gamma',
    name: 'Gamma Distribution',
    formula: React.createElement('div', { className: "text-xl font-mono flex items-center" },
      "f(x) = ", React.createElement("div", { className: "frac mx-2" }, React.createElement("span", null, "x", React.createElement("sup", null, "α-1"), "e", React.createElement("sup", null, "-x/β")), React.createElement("span", { className: "symbol" }, "/"), React.createElement("span", { className: "bottom" }, "β", React.createElement("sup", null, "α"),"Γ(α)"))
    ),
    summary: "Models the waiting time until a specified number of events occur.",
    explanation: "The Gamma distribution is a continuous distribution often used to model waiting times. Its formula, f(x), is a Probability Density Function. 'X' is a random variable representing the waiting time until 'α' events have occurred, and 'x' is a specific amount of time. The area under the curve gives the probability of the waiting time falling in a certain interval.",
    conditions: [
        "The variable is continuous and non-negative (e.g. time).",
        "It is flexible and can model a wide variety of skewed shapes.",
        "The shape (α) and scale (β) parameters must be positive."
    ],
     realWorldExamples: [
        "Time until the 5th customer arrives at a store.",
        "The amount of rainfall accumulated in a month.",
        "Modeling the size of insurance claims or loan defaults."
    ],
    keyTakeaways: [
        "It's the continuous version of the Negative Binomial.",
        "Think of it as the 'waiting time' for multiple events in a continuous process.",
        "If you are waiting for just one event (α=1), it simplifies to the Exponential distribution."
    ],
    dataGenerator: generateGammaData,
    cdfGenerator: cdfGamma,
    randomVariate: randomGamma,
    parameters: [
        { id: 'alpha', name: 'α (Shape)', min: 0.5, max: 20, step: 0.5, defaultValue: 2 },
        { id: 'beta', name: 'β (Scale)', min: 0.5, max: 10, step: 0.5, defaultValue: 2 }
    ],
    graphType: 'line',
    xAxisKey: 'x',
    yAxisKey: 'density',
    xAxisLabel: 'Value (x)',
    yAxisLabel: 'Probability Density',
  },
    {
    id: 'gev',
    name: 'Generalized Extreme Value (GEV)',
    formula: React.createElement('p', { className: "text-xl font-mono" }, "F(x) = exp{-[1+ξ((x-μ)/σ)]⁻¹/ξ}"),
    summary: "Models the maximum (or minimum) value from a large collection of data.",
    explanation: "The GEV distribution models the distribution of the maximum (or minimum) of a large number of variables. The formula F(x) represents the Cumulative Distribution Function (CDF), which gives the probability that the random variable 'X' (the maximum value) is less than or equal to a specific value 'x'.",
    conditions: [
        "Used when you are interested in the extremes of a process, not the average.",
        "Requires a large block of data from which to draw a maximum.",
        "The shape parameter (ξ) determines the tail behavior of the distribution."
    ],
     realWorldExamples: [
        "Modeling the maximum annual rainfall at a location.",
        "Estimating the highest level a river will reach in a century (100-year flood).",
        "Predicting the maximum daily loss for a financial portfolio."
    ],
    keyTakeaways: [
        "This is all about the extremes: the biggest, highest, fastest, worst.",
        "It's a 'meta-distribution' that describes the distribution of maximums.",
        "Crucial for risk management in finance, engineering, and climate science."
    ],
    dataGenerator: generateGEVData,
    cdfGenerator: cdfGEV,
    randomVariate: randomGEV,
    parameters: [
        {
            id: 'xi',
            name: 'ξ (Shape)',
            min: -0.5,
            max: 0.5,
            step: 0.05,
            defaultValue: 0.1,
            explanation: [
              "This parameter defines the 'tail' of the distribution, which is critical for understanding extreme events.",
              "ξ > 0 (Heavy Tail / Fréchet): Represents phenomena with no upper limit, where extreme values are more likely. Think financial crashes or record floods.",
              "ξ = 0 (Light Tail / Gumbel): Represents phenomena with a more 'normal' tail, like annual maximum temperatures. Extremes are less likely.",
              "ξ < 0 (Finite Tail / Weibull): Represents phenomena with a physical upper limit that cannot be exceeded, such as wind speed or human lifespan."
            ]
        },
        { 
            id: 'mu', 
            name: 'μ (Location)', 
            min: -5, 
            max: 5, 
            step: 0.5, 
            defaultValue: 0,
            explanation: ["The location parameter. It shifts the distribution along the x-axis, controlling the center of the distribution."],
        },
        { 
            id: 'sigma', 
            name: 'σ (Scale)', 
            min: 0.1, 
            max: 5, 
            step: 0.1, 
            defaultValue: 1,
            explanation: ["The scale parameter (must be > 0). It stretches or shrinks the distribution, controlling its spread or width."],
        }
    ],
    graphType: 'line',
    xAxisKey: 'x',
    yAxisKey: 'density',
    xAxisLabel: 'Extreme Value (x)',
    yAxisLabel: 'Probability Density',
  },
  {
    id: 'gp',
    name: 'Generalized Pareto (GP)',
    formula: React.createElement('p', { className: "text-xl font-mono" }, "F(x) = 1 - [1+ξ((x-u)/α)]⁻¹/ξ"),
    summary: "Models data that exceeds a certain high threshold.",
    explanation: "The GP distribution models the tail of another distribution above a high threshold. Its formula F(x) is the Cumulative Distribution Function (CDF), giving the probability that the exceedance value 'X' is less than or equal to 'x'. 'X' is the random variable representing the amount by which an observation exceeds the threshold 'u'.",
    conditions: [
        "You have a high threshold (u) and are only interested in data points that cross it.",
        "Used to understand the behavior of the tail of a distribution.",
        "Key for understanding risk of rare but impactful events."
    ],
     realWorldExamples: [
        "Modeling the size of insurance claims that exceed $1 million.",
        "Analyzing the magnitude of earthquakes above a certain Richter scale value.",
        "Studying daily stock market returns that exceed a 5% loss."
    ],
    keyTakeaways: [
        "Not for all data, just the 'excess' above a line you draw.",
        "Answers: 'Given that something bad happened, how bad could it be?'",
        "If GEV is for the single maximum of a block, GP is for all values that are extreme."
    ],
    dataGenerator: generateGPData,
    cdfGenerator: cdfGP,
    randomVariate: randomGP,
    parameters: [
        {
            id: 'xi',
            name: 'ξ (Shape)',
            min: -0.5,
            max: 1,
            step: 0.05,
            defaultValue: 0.2,
            explanation: [
              "This parameter defines the 'tail' of the exceedances, determining how extreme the values above the threshold can be.",
              "ξ > 0 (Heavy Tail): The tail is unbounded. Common in financial data where extreme losses can be very large.",
              "ξ = 0 (Exponential Tail): Corresponds to a standard exponential distribution tail. Common in processes with 'memoryless' properties.",
              "ξ < 0 (Short Tail): The tail has a finite upper limit. There is a maximum possible value for the exceedance."
            ]
        },
        { id: 'sigma', name: 'σ (Scale)', min: 0.1, max: 5, step: 0.1, defaultValue: 1 }
    ],
    graphType: 'line',
    xAxisKey: 'x',
    yAxisKey: 'density',
    xAxisLabel: 'Exceedance Value (x)',
    yAxisLabel: 'Probability Density',
  },
];