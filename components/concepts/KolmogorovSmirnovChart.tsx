
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ComposedChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Line, ResponsiveContainer, ReferenceArea } from 'recharts';
import { MathUtils } from '../../utils/math';

const KolmogorovSmirnovChart: React.FC = () => {
    const [sample, setSample] = useState<number[]>([]);
    const [distType, setDistType] = useState<'normal' | 'uniform'>('normal');
    
    const generateNewSample = useCallback(() => {
        const newSample = [];
        for (let i = 0; i < 50; i++) {
            if (distType === 'normal') {
                newSample.push(MathUtils.normalQuantile(Math.random()));
            } else {
                newSample.push(Math.random());
            }
        }
        setSample(newSample.sort((a,b) => a-b));
    }, [distType]);
    
    useEffect(generateNewSample, [generateNewSample]);

    const empiricalCdfData = useMemo(() => MathUtils.calculateEcdf(sample), [sample]);

    const { theoreticalCdfData, dStatistic, maxDiffPoint, criticalValue } = useMemo(() => {
        if (sample.length === 0) return { theoreticalCdfData: [], dStatistic: 0, maxDiffPoint: null, criticalValue: 0 };

        const theoreticalCdfData = [];
        let dStatistic = 0;
        let maxDiffPoint: { x: number, ecdf: number, cdf: number } | null = null;
        
        const cdfFunc = (x: number) => distType === 'normal' ? MathUtils.normalCdf(x) : Math.max(0, Math.min(1, x));

        for (const point of empiricalCdfData) {
            const cdf = cdfFunc(point.x);
            theoreticalCdfData.push({ x: point.x, cdf });

            const diff = Math.abs(point.cdf - cdf);
            if (diff > dStatistic) {
                dStatistic = diff;
                maxDiffPoint = { x: point.x, ecdf: point.cdf, cdf };
            }
        }
        // Critical value for alpha=0.05 is approximately 1.36 / sqrt(n)
        const criticalValue = 1.36 / Math.sqrt(sample.length);

        return { theoreticalCdfData, dStatistic, maxDiffPoint, criticalValue };
    }, [sample, distType, empiricalCdfData]);

    const labelFormatter = (label: number) => `Value: ${label.toFixed(2)}`;

    return (
        <div className="w-full">
            <div className="bg-gray-800/50 p-4 rounded-lg mb-4 flex items-center space-x-4">
                <label htmlFor="dist-type-select" className="text-gray-300 font-semibold">Test against:</label>
                <select id="dist-type-select" value={distType} onChange={e => setDistType(e.target.value as any)} className="bg-gray-700 text-white rounded-md p-2">
                    <option value="normal">Standard Normal</option>
                    <option value="uniform">Uniform(0,1)</option>
                </select>
                <button onClick={generateNewSample} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Generate New Sample (n=50)
                </button>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">D-statistic</h4><p className="font-mono text-white text-2xl">{dStatistic.toFixed(3)}</p></div>
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Critical Value (α=0.05)</h4><p className="font-mono text-red-400 text-2xl">{criticalValue.toFixed(3)}</p></div>
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Result</h4><p className={`font-bold text-2xl ${dStatistic > criticalValue ? 'text-pink-400' : 'text-green-400'}`}>{dStatistic > criticalValue ? 'Reject H₀' : 'Fail to Reject H₀'}</p></div>
            </div>
            <div className="w-full h-96 bg-gray-800 p-4 rounded-lg shadow-inner">
                <ResponsiveContainer>
                    <ComposedChart margin={{ top: 5, right: 20, left: 30, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                        <XAxis type="number" dataKey="x" stroke="#a0aec0" domain={distType === 'normal' ? [-3, 3] : [0, 1]} tickFormatter={(tick) => tick.toFixed(2)}>
                            <Label value="Value" offset={-15} position="insideBottom" fill="#a0aec0" />
                        </XAxis>
                        <YAxis stroke="#a0aec0" domain={[0, 1]}>
                            <Label value="Cumulative Probability" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-20} />
                        </YAxis>
                        <Tooltip contentStyle={{ backgroundColor: '#1E1E1E' }} formatter={(v) => typeof v === 'number' ? v.toFixed(3) : v} labelFormatter={labelFormatter} />
                        <Line data={theoreticalCdfData} type="monotone" dataKey="cdf" stroke="#22d3ee" dot={false} name="Theoretical CDF" />
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

export default KolmogorovSmirnovChart;
