
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { MathUtils } from '../../utils/math';

const MannKendallChart: React.FC = () => {
    const [params, setParams] = useState({ trend: 0.1, noise: 2, n: 50 });
    const [data, setData] = useState<{time: number, value: number}[]>([]);

    const generateData = useCallback(() => {
        const newData = [];
        for (let i = 0; i < params.n; i++) {
            const trendComponent = params.trend * i;
            const noiseComponent = (Math.random() - 0.5) * params.noise;
            newData.push({ time: i + 1, value: trendComponent + noiseComponent });
        }
        setData(newData);
    }, [params]);

    useEffect(generateData, [generateData]);

    const { sStat, zStat } = useMemo(() => {
        if (data.length < 2) return {};
        const n = data.length;
        let sStat = 0;
        for (let i = 0; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                sStat += Math.sign(data[j].value - data[i].value);
            }
        }
        
        // Variance calculation (assuming no ties for simplicity)
        const varianceS = (n * (n - 1) * (2 * n + 5)) / 18;
        
        let zStat;
        if (sStat > 0) {
            zStat = (sStat - 1) / Math.sqrt(varianceS);
        } else if (sStat < 0) {
            zStat = (sStat + 1) / Math.sqrt(varianceS);
        } else {
            zStat = 0;
        }

        return { sStat, zStat };
    }, [data]);
    
    const criticalZ = 1.96; // For two-tailed alpha=0.05
    const pValue = 2 * (1 - MathUtils.normalCdf(Math.abs(zStat || 0)));

    const handleParamChange = (field: string, value: number) => {
        setParams(p => ({ ...p, [field]: value }));
    };

    const labelFormatter = (label: number) => `Time: ${label}`;

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-gray-800/50 p-6 rounded-lg mb-4">
                <div>
                    <label className="flex justify-between items-center text-gray-300 mb-2"><span>Trend (Slope)</span><span className="font-mono bg-gray-700 px-2 py-1 rounded">{params.trend.toFixed(2)}</span></label>
                    <input type="range" min={-0.5} max={0.5} step={0.01} value={params.trend} onChange={e => handleParamChange('trend', parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg accent-cyan-500" />
                </div>
                 <div>
                    <label className="flex justify-between items-center text-gray-300 mb-2"><span>Noise Level</span><span className="font-mono bg-gray-700 px-2 py-1 rounded">{params.noise.toFixed(1)}</span></label>
                    <input type="range" min={0} max={10} step={0.1} value={params.noise} onChange={e => handleParamChange('noise', parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg accent-cyan-500" />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">S-statistic</h4><p className="font-mono text-white text-2xl">{sStat}</p></div>
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">P-value</h4><p className="font-mono text-white text-2xl">{pValue.toFixed(3)}</p></div>
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Result (α=0.05)</h4><p className={`font-bold text-2xl ${Math.abs(zStat || 0) > criticalZ ? 'text-pink-400' : 'text-green-400'}`}>{Math.abs(zStat || 0) > criticalZ ? 'Trend Detected' : 'No Trend'}</p></div>
            </div>
            <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                <ResponsiveContainer>
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                        <XAxis type="number" dataKey="time" domain={['dataMin', 'dataMax']}>
                            <Label value="Time" offset={-15} position="insideBottom" fill="#a0aec0" />
                        </XAxis>
                        <YAxis tickFormatter={(tick) => typeof tick === 'number' ? tick.toFixed(1) : tick}>
                            <Label value="Value" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-10} />
                        </YAxis>
                        <Tooltip contentStyle={{ backgroundColor: '#1E1E1E' }} formatter={(v) => typeof v === 'number' ? v.toFixed(2) : v} labelFormatter={labelFormatter} />
                        <Line type="monotone" dataKey="value" stroke="#22d3ee" dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MannKendallChart;
