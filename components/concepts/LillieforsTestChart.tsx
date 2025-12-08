
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ComposedChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Line, ResponsiveContainer, ReferenceArea } from 'recharts';
import { MathUtils } from '../../utils/math';
import { distributions } from '../../data/distributions';

const LillieforsTestChart: React.FC = () => {
    const [sample, setSample] = useState<number[]>([]);
    const [distType, setDistType] = useState<'gaussian' | 'uniform' | 'gamma'>('gaussian');
    
    const generateNewSample = useCallback(() => {
        const dist = distributions.find(d => d.id === distType);
        
        let params = {};
        if (distType === 'gaussian') {
            params = { mu: 5, sigma: 2 };
        } else if (distType === 'gamma') {
            params = { alpha: 2, beta: 2 };
        } else if (distType === 'uniform') { 
             const newSample = Array.from({length: 50}, () => Math.random() * 10); // Uniform(0, 10)
             setSample(newSample);
             return;
        }

        if (!dist) return;
        const newSample = MathUtils.generateSample(dist, params, 50);
        setSample(newSample);
    }, [distType]);
    
    useEffect(generateNewSample, [generateNewSample]);

    const { standardizedSample } = useMemo(() => {
        if (sample.length < 2) return { standardizedSample: [] };
        const mean = sample.reduce((a, b) => a + b, 0) / sample.length;
        const stdDev = Math.sqrt(sample.reduce((a, b) => a + (b - mean)**2, 0) / (sample.length - 1));

        if (stdDev === 0) return { standardizedSample: [] };

        const standardized = sample.map(x => (x - mean) / stdDev).sort((a,b) => a - b);
        return { standardizedSample: standardized };
    }, [sample]);

    const empiricalCdfData = useMemo(() => MathUtils.calculateEcdf(standardizedSample), [standardizedSample]);

    const { theoreticalCdfData, dStatistic, maxDiffPoint, criticalValue } = useMemo(() => {
        if (standardizedSample.length < 2) return { theoreticalCdfData: [], dStatistic: 0, maxDiffPoint: null, criticalValue: 0 };

        const theoreticalCdfData = [];
        let dStatistic = 0;
        let maxDiffPoint: { x: number, ecdf: number, cdf: number } | null = null;
        
        for (const point of empiricalCdfData) {
            const cdf = MathUtils.normalCdf(point.x);
            theoreticalCdfData.push({ x: point.x, cdf });

            const diff = Math.abs(point.cdf - cdf);
            if (diff > dStatistic) {
                dStatistic = diff;
                maxDiffPoint = { x: point.x, ecdf: point.cdf, cdf };
            }
        }
        // Lilliefors critical value for alpha=0.05 is approximately 0.886 / sqrt(n)
        const n = standardizedSample.length;
        const criticalValue = 0.886 / Math.sqrt(n);

        return { theoreticalCdfData, dStatistic, maxDiffPoint, criticalValue };
    }, [standardizedSample, empiricalCdfData]);

    const distOptions = distributions.filter(d => ['gaussian', 'gamma'].includes(d.id));

    const labelFormatter = (label: number) => `Z-score: ${label.toFixed(1)}`;

    return (
        <div className="w-full">
            <div className="bg-gray-800/50 p-4 rounded-lg mb-4 flex items-center space-x-4">
                <label htmlFor="dist-type-select" className="text-gray-300 font-semibold">Sample from:</label>
                <select id="dist-type-select" value={distType} onChange={e => setDistType(e.target.value as any)} className="bg-gray-700 text-white rounded-md p-2">
                    {distOptions.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    <option value="uniform">Uniform Distribution</option>
                </select>
                <button onClick={generateNewSample} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Generate New Sample (n=50)
                </button>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">D-statistic</h4><p className="font-mono text-white text-2xl">{dStatistic.toFixed(3)}</p></div>
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Lilliefors Critical Value</h4><p className="font-mono text-red-400 text-2xl">{criticalValue.toFixed(3)}</p></div>
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Result (is Normal?)</h4><p className={`font-bold text-2xl ${dStatistic > criticalValue ? 'text-pink-400' : 'text-green-400'}`}>{dStatistic > criticalValue ? 'No (Reject H₀)' : 'Yes (Fail to Reject H₀)'}</p></div>
            </div>
            <div className="w-full h-96 bg-gray-800 p-4 rounded-lg shadow-inner">
                <p className="text-sm text-gray-400 text-center -mt-2 mb-2">Compares standardized sample ECDF to Standard Normal CDF.</p>
                <ResponsiveContainer>
                    <ComposedChart margin={{ top: 5, right: 20, left: 30, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                        <XAxis type="number" dataKey="x" stroke="#a0aec0" domain={[-3, 3]} tickFormatter={(tick) => tick.toFixed(1)}>
                            <Label value="Standardized Value (z-score)" offset={-15} position="insideBottom" fill="#a0aec0" />
                        </XAxis>
                        <YAxis stroke="#a0aec0" domain={[0, 1]}>
                            <Label value="Cumulative Probability" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-20} />
                        </YAxis>
                        <Tooltip contentStyle={{ backgroundColor: '#1E1E1E' }} formatter={(v) => typeof v === 'number' ? v.toFixed(3) : v} labelFormatter={labelFormatter} />
                        <Line data={theoreticalCdfData} type="monotone" dataKey="cdf" stroke="#22d3ee" dot={false} name="Standard Normal CDF" />
                        <Line data={empiricalCdfData} type="stepAfter" dataKey="cdf" stroke="#f472b6" dot={false} name="Empirical CDF (Sample)" />
                        {maxDiffPoint && (
                            <ReferenceArea
                                x1={maxDiffPoint.x}
                                x2={maxDiffPoint.x}
                                y1={maxDiffPoint.cdf}
                                y2={maxDiffPoint.ecdf}
                                stroke="yellow"
                                strokeWidth={2}
                                strokeOpacity={1}
                                ifOverflow="visible"
                            >
                                <Label value={`D = ${dStatistic.toFixed(3)}`} position="right" fill="yellow" />
                            </ReferenceArea>
                        )}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LillieforsTestChart;
