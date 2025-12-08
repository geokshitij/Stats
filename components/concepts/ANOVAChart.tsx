
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, ReferenceLine, ComposedChart, Area, Cell } from 'recharts';
import { MathUtils } from '../../utils/math';

// Helper to generate sample data
const generateSample = (n: number, mean: number, std: number): number[] => {
    const sample = [];
    for (let i = 0; i < n; i++) {
        let u1, u2;
        do { u1 = Math.random(); } while (u1 === 0);
        do { u2 = Math.random(); } while (u2 === 0);
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        sample.push(z0 * std + mean);
    }
    return sample;
};

const ANOVAChart: React.FC = () => {
    const [groups, setGroups] = useState([
        { name: 'Group A', n: 30, mean: 10, std: 2, color: '#22d3ee' },
        { name: 'Group B', n: 30, mean: 11, std: 2, color: '#f472b6' },
        { name: 'Group C', n: 30, mean: 12, std: 2, color: '#a78bfa' },
    ]);
    const [samples, setSamples] = useState<number[][]>([]);

    const generateAllSamples = useCallback(() => {
        setSamples(groups.map(g => generateSample(g.n, g.mean, g.std)));
    }, [groups]);

    useEffect(generateAllSamples, [generateAllSamples]);

    const anovaResults = useMemo(() => {
        if (samples.length === 0 || samples.some(s => s.length < 2)) return {};

        const k = groups.length;
        const groupMeans = samples.map(s => s.reduce((a, b) => a + b, 0) / s.length);
        const groupVars = samples.map((s, i) => s.reduce((a, b) => a + (b - groupMeans[i])**2, 0) / (s.length - 1));

        const totalN = groups.reduce((sum, g) => sum + g.n, 0);
        const grandMean = groupMeans.reduce((sum, m, i) => sum + m * groups[i].n, 0) / totalN;

        const ssb = groupMeans.reduce((sum, m, i) => sum + groups[i].n * (m - grandMean)**2, 0);
        const ssw = groupVars.reduce((sum, v, i) => sum + (groups[i].n - 1) * v, 0);

        const dfb = k - 1;
        const dfw = totalN - k;
        
        const msb = ssb / dfb;
        const msw = ssw / dfw;
        
        const fStat = msw > 0 ? msb / msw : 0;
        
        const criticalValue = MathUtils.fDistQuantile(0.95, dfb, dfw);

        return { ssb, ssw, dfb, dfw, msb, msw, fStat, criticalValue, grandMean };
    }, [samples, groups]);
    
    const scatterData = useMemo(() => {
        return samples.flatMap((sample, i) => 
            sample.map(value => ({
                group: groups[i].name,
                value,
                color: groups[i].color
            }))
        );
    }, [samples, groups]);

    const fDistData = useMemo(() => {
        if (!anovaResults.dfb || !anovaResults.dfw) return [];
        const { dfb, dfw, criticalValue, fStat } = anovaResults;
        const data = [];
        const maxX = Math.max(5, (criticalValue || 0) * 1.5, (fStat || 0) * 1.2);
        const step = maxX / 100;
        for (let x = step; x <= maxX; x += step) {
            const density = MathUtils.fDistPdf(x, dfb, dfw);
            if (isFinite(density)) {
                 data.push({
                    x, density,
                    rejectionArea: (x >= (criticalValue || Infinity)) ? density : null
                });
            }
        }
        return data;
    }, [anovaResults]);

    const handleParamChange = (index: number, field: string, value: number) => {
        const newGroups = [...groups];
        newGroups[index] = { ...newGroups[index], [field]: value };
        setGroups(newGroups);
    };

    return (
        <div className="w-full space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-800/50 p-6 rounded-lg">
                {groups.map((g, i) => (
                    <div key={i} className="space-y-2 border-l-4 pl-4" style={{borderColor: g.color}}>
                        <h4 className="font-bold" style={{color: g.color}}>{g.name}</h4>
                        <label className="text-xs flex justify-between">Mean: <span>{g.mean.toFixed(1)}</span></label>
                        <input type="range" min={5} max={15} step={0.1} value={g.mean} onChange={e => handleParamChange(i, 'mean', +e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg accent-gray-500" />
                        <label className="text-xs flex justify-between">Std Dev: <span>{g.std.toFixed(1)}</span></label>
                        <input type="range" min={0.5} max={5} step={0.1} value={g.std} onChange={e => handleParamChange(i, 'std', +e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg accent-gray-500" />
                    </div>
                ))}
            </div>
            <div className="text-center">
                <button onClick={generateAllSamples} className="bg-gray-700 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg">Generate New Samples</button>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-2 text-center">ANOVA Table</h3>
                <table className="w-full text-center">
                    <thead><tr className="border-b border-gray-600"><th className="p-2">Source</th><th>SS</th><th>df</th><th>MS</th><th>F</th></tr></thead>
                    <tbody>
                        <tr><td>Between</td><td>{anovaResults.ssb?.toFixed(2)}</td><td>{anovaResults.dfb}</td><td>{anovaResults.msb?.toFixed(2)}</td><td rowSpan={2} className="font-bold text-xl align-middle">{anovaResults.fStat?.toFixed(2)}</td></tr>
                        <tr><td>Within</td><td>{anovaResults.ssw?.toFixed(2)}</td><td>{anovaResults.dfw}</td><td>{anovaResults.msw?.toFixed(2)}</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                    <h4 className="text-center font-semibold text-gray-400 mb-2">Sample Data Points</h4>
                    <ResponsiveContainer>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                            <XAxis type="category" dataKey="group" name="Group" />
                            <YAxis type="number" dataKey="value" name="Value" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Samples" data={scatterData}>
                                {scatterData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                    <h4 className="text-center font-semibold text-gray-400 mb-2">F-Distribution (H₀)</h4>
                    <ResponsiveContainer>
                         <ComposedChart data={fDistData} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                            <XAxis type="number" dataKey="x" domain={['dataMin', 'dataMax']} tickFormatter={(tick) => tick.toFixed(1)}><Label value="F-statistic" offset={-15} position="insideBottom" fill="#a0aec0" /></XAxis>
                            <YAxis><Label value="Density" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-20} /></YAxis>
                            <Tooltip contentStyle={{ backgroundColor: '#1E1E1E' }} />
                            <Area type="monotone" dataKey="density" stroke="#a0aec0" fill="#a0aec0" fillOpacity={0.2} />
                            <Area type="monotone" dataKey="rejectionArea" stroke="none" fill="#e11d48" fillOpacity={0.7} />
                            <ReferenceLine x={anovaResults.fStat} stroke="#22d3ee" strokeWidth={3}><Label value="Observed F" position="top" fill="#22d3ee" /></ReferenceLine>
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ANOVAChart;
