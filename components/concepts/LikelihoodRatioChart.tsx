
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ComposedChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Area, ReferenceLine, ResponsiveContainer } from 'recharts';
import { MathUtils } from '../../utils/math';

const LikelihoodRatioChart: React.FC = () => {
    const [sample, setSample] = useState<number[]>([]);

    const generateNewSample = useCallback(() => {
        const newSample = [];
        for (let i = 0; i < 50; i++) {
            // Sample from a non-standard normal distribution
            newSample.push(MathUtils.normalQuantile(Math.random()) * 1.5 + 0.5); // mu=0.5, sigma=1.5
        }
        setSample(newSample);
    }, []);

    useEffect(generateNewSample, [generateNewSample]);

    const { stats, lrStat, df, criticalValue } = useMemo(() => {
        // FIX: Provide default values for stats when sample is empty to ensure consistent object shape.
        if (sample.length === 0) return { stats: { ll_null: 0, ll_alt: 0 }, lrStat: 0, df: 0, criticalValue: 0 };
        
        const n = sample.length;
        const sampleMean = sample.reduce((a, b) => a + b, 0) / n;
        const sampleVar = sample.reduce((a, b) => a + (b - sampleMean)**2, 0) / n; // MLE for variance
        
        // Log-Likelihood for Normal Distribution
        const logLikelihood = (mu: number, sigmaSq: number) => {
            if (sigmaSq <= 0) return -Infinity;
            const term1 = - (n / 2) * Math.log(2 * Math.PI * sigmaSq);
            const term2 = - (1 / (2 * sigmaSq)) * sample.reduce((a, b) => a + (b - mu)**2, 0);
            return term1 + term2;
        };

        // Null Model: Standard Normal (mu=0, sigma=1)
        const ll_null = logLikelihood(0, 1);

        // Alternative Model: Normal with estimated mu and sigma
        const ll_alt = logLikelihood(sampleMean, sampleVar);

        const lrStat = 2 * (ll_alt - ll_null);
        const df = 2; // We estimated 2 params (mu, sigma) vs 0 in null model
        
        // Critical value for chi-square with df=2, alpha=0.05
        const criticalValue = 5.991;

        const stats = {
            sampleMean,
            sampleVar,
            ll_null,
            ll_alt
        };

        return { stats, lrStat, df, criticalValue };
    }, [sample]);

    const chi2DistData = useMemo(() => {
        if (df <= 0) return [];
        const data = [];
        const pdf = (x: number) => {
            if (x <= 0) return 0;
            const num = Math.pow(x, df/2 - 1) * Math.exp(-x/2);
            const den = Math.pow(2, df/2) * MathUtils.gamma(df/2);
            return num/den;
        };
        const maxX = Math.max(10, criticalValue * 1.5, lrStat * 1.2);
        for(let x = 0.1; x <= maxX; x += maxX/100) {
            const d = pdf(x);
            data.push({
                x, 
                density: d,
                rejectionArea: (x >= criticalValue) ? d : null
            });
        }
        return data;
    }, [df, criticalValue, lrStat]);

    const labelFormatter = (label: number) => `LR Statistic: ${label.toFixed(1)}`;

    return (
        <div className="w-full">
            <div className="text-center mb-4">
                <button onClick={generateNewSample} className="bg-gray-700 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Generate New Sample (n=50)</button>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mb-4">
                 <div className="bg-gray-800 p-3 rounded-lg">
                    <h4 className="font-semibold text-gray-400">Null Model LL (Standard Normal)</h4>
                    {/* FIX: Removed optional chaining as `stats` object is now guaranteed to have `ll_null`. */}
                    <p className="font-mono text-white text-xl">{stats.ll_null.toFixed(2)}</p>
                 </div>
                 <div className="bg-gray-800 p-3 rounded-lg">
                    <h4 className="font-semibold text-gray-400">Alternative Model LL (Fitted)</h4>
                    {/* FIX: Removed optional chaining as `stats` object is now guaranteed to have `ll_alt`. */}
                    <p className="font-mono text-white text-xl">{stats.ll_alt.toFixed(2)}</p>
                 </div>
                 <div className="bg-gray-800 p-3 rounded-lg">
                    <h4 className="font-semibold text-gray-400">Likelihood Ratio Statistic</h4>
                    <p className="font-mono text-white text-2xl">{lrStat.toFixed(2)}</p>
                 </div>
                 <div className="bg-gray-800 p-3 rounded-lg">
                    <h4 className="font-semibold text-gray-400">Result (α=0.05)</h4>
                    <p className={`font-bold text-2xl ${lrStat > criticalValue ? 'text-pink-400' : 'text-green-400'}`}>{lrStat > criticalValue ? 'Reject H₀' : 'Fail to Reject H₀'}</p>
                 </div>
            </div>

            <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                <p className="text-sm text-gray-400 text-center -mt-2 mb-2">LR statistic distribution under H₀ (χ² with {df} df)</p>
                <ResponsiveContainer>
                    <ComposedChart data={chi2DistData} margin={{ top: 25, right: 30, bottom: 20, left: 20 }}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                        <XAxis type="number" dataKey="x" domain={['dataMin', 'dataMax']} tickFormatter={(tick) => tick.toFixed(1)}>
                            <Label value="LR Statistic" offset={-15} position="insideBottom" fill="#a0aec0" />
                        </XAxis>
                        <YAxis>
                             {/* FIX: Changed '=' to ':' for the `fill` property in the style object. */}
                             <Label value="Density" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-20} />
                        </YAxis>
                        <Tooltip contentStyle={{ backgroundColor: '#1E1E1E' }} formatter={(v) => typeof v === 'number' ? v.toFixed(3) : v} labelFormatter={labelFormatter}/>
                        <Area type="monotone" dataKey="density" stroke="#a0aec0" fill="#a0aec0" fillOpacity={0.2} name="χ²-distribution" />
                        <Area type="monotone" dataKey="rejectionArea" stroke="none" fill="#e11d48" fillOpacity={0.7} name="Rejection Region" />
                        <ReferenceLine x={lrStat} stroke="#22d3ee" strokeWidth={3}>
                            <Label value="Observed Statistic" position="top" fill="#22d3ee" />
                        </ReferenceLine>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LikelihoodRatioChart;
