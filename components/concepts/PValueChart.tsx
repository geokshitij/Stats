import React, { useState, useMemo } from 'react';
import { ComposedChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Area, ReferenceLine, ResponsiveContainer } from 'recharts';

const PValueChart: React.FC = () => {
    const [statistic, setStatistic] = useState(1.96);

    const data = useMemo(() => {
         const d = [];
         for (let x = -4; x <= 4; x += 0.1) {
             const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
             d.push({x, y});
         }
         return d;
    }, []);

    const pValue = 1 - (0.5 * (1 + (x => { const sign = x >= 0 ? 1 : -1; x = Math.abs(x); const t = 1.0 / (1.0 + 0.3275911 * x); const y = 1.0 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return sign * y; })(statistic / Math.sqrt(2))));

    // FIX: Ensure tooltipFormatter returns a valid ReactNode to fix TypeScript error.
    const tooltipFormatter = (value: unknown) => {
      if (typeof value === 'number') {
        return value.toFixed(4);
      }
      if (typeof value === 'string') {
        return value;
      }
      return null;
    };
    
    const labelFormatter = (label: number) => `Statistic: ${label.toFixed(3)}`;

    return (
         <div className="w-full">
            <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                <label className="flex justify-between items-center text-gray-300 mb-2">
                    <span>Observed Statistic (z-score)</span>
                    <span className="font-mono bg-gray-700 px-2 py-1 rounded text-cyan-400">{statistic.toFixed(2)}</span>
                </label>
                <input type="range" min="-3" max="3" step="0.01" value={statistic} onChange={e => setStatistic(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
            </div>
             <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                 <ResponsiveContainer>
                    <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                        <XAxis type="number" dataKey="x" domain={[-4, 4]} tickFormatter={(tick) => tick.toFixed(1)}>
                            <Label value="Statistic Value" offset={-15} position="insideBottom" fill="#a0aec0" />
                        </XAxis>
                        <YAxis domain={[0, 0.45]}>
                            <Label value="Density" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-20} />
                        </YAxis>
                        <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', color: '#E0E0E0' }} formatter={tooltipFormatter} labelFormatter={labelFormatter}/>
                        <Area type="monotone" dataKey="y" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.3} name="H₀ Distribution" />
                        <Area type="monotone" dataKey="y" stroke="none" fill="#f472b6" fillOpacity={0.7} name={`p-value = ${pValue.toFixed(3)}`} data={data.filter(d => d.x >= statistic)} />
                        <ReferenceLine x={statistic} stroke="white">
                             <Label value="Observed" position="top" fill="white" />
                        </ReferenceLine>
                    </ComposedChart>
                 </ResponsiveContainer>
            </div>
         </div>
    )
};

export default PValueChart;