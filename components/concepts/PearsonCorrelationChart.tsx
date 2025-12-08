import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

const PearsonCorrelationChart: React.FC = () => {
    const [params, setParams] = useState({
        correlation: 0.8,
        sampleSize: 100,
    });
    const [data, setData] = useState<{x: number, y: number}[]>([]);
    
    // Box-Muller transform for standard normal
    const randomStandardNormal = (): number => {
        let u1, u2;
        do { u1 = Math.random(); } while (u1 === 0);
        do { u2 = Math.random(); } while (u2 === 0);
        return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    };

    const generateData = useCallback(() => {
        const { correlation, sampleSize } = params;
        const newData = [];
        for (let i = 0; i < sampleSize; i++) {
            const z1 = randomStandardNormal();
            const z2 = randomStandardNormal();
            const x = z1;
            const y = correlation * z1 + Math.sqrt(1 - correlation * correlation) * z2;
            newData.push({ x, y });
        }
        setData(newData);
    }, [params]);

    useEffect(() => {
        generateData();
    }, [generateData]);

    const calculatedR = useMemo(() => {
        if (data.length < 2) return 0;
        const n = data.length;
        const meanX = data.reduce((sum, d) => sum + d.x, 0) / n;
        const meanY = data.reduce((sum, d) => sum + d.y, 0) / n;
        
        let numerator = 0;
        let denX = 0;
        let denY = 0;

        for (const d of data) {
            numerator += (d.x - meanX) * (d.y - meanY);
            denX += Math.pow(d.x - meanX, 2);
            denY += Math.pow(d.y - meanY, 2);
        }

        if (denX === 0 || denY === 0) return 0;

        return numerator / Math.sqrt(denX * denY);
    }, [data]);
    
    const handleParamChange = (field: string, value: number) => {
        setParams(p => ({ ...p, [field]: value }));
    };

    const ParamSlider: React.FC<{ name: string, field: keyof typeof params, min: number, max: number, step: number }> = ({ name, field, min, max, step }) => (
        <div className="flex-1">
            <label className="flex justify-between items-center text-gray-300 mb-2">
                <span>{name}</span>
                <span className="font-mono bg-gray-700 px-2 py-1 rounded text-cyan-400">{params[field]}</span>
            </label>
            <input type="range" min={min} max={max} step={step} value={params[field]}
                   onChange={e => handleParamChange(field, parseFloat(e.target.value))}
                   className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
        </div>
    );
    
    // FIX: Ensure tooltipFormatter returns a valid ReactNode to fix TypeScript error.
    const tooltipFormatter = (value: unknown) => {
      if (typeof value === 'number') {
        return value.toFixed(3);
      }
      if (typeof value === 'string') {
        return value;
      }
      return null;
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-gray-800/50 p-6 rounded-lg mb-4">
                <ParamSlider name="Target Correlation (ρ)" field="correlation" min={-1} max={1} step={0.01} />
                <ParamSlider name="Sample Size (n)" field="sampleSize" min={10} max={500} step={10} />
            </div>
            <div className="text-center mb-4">
                 <button onClick={generateData} className="bg-gray-700 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Generate New Sample</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mb-4">
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Target Correlation (ρ)</h4><p className="font-mono text-white text-2xl">{params.correlation.toFixed(2)}</p></div>
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Sample Correlation (r)</h4><p className="font-mono text-white text-2xl">{calculatedR.toFixed(3)}</p></div>
            </div>
            <div className="w-full h-96 bg-gray-800 p-4 rounded-lg shadow-inner">
                 <ResponsiveContainer>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                        <XAxis type="number" dataKey="x" name="X" domain={[-4, 4]} tickFormatter={(tick) => typeof tick === 'number' ? tick.toFixed(1) : tick}>
                             <Label value="X Variable" offset={-15} position="insideBottom" fill="#a0aec0" />
                        </XAxis>
                        <YAxis type="number" dataKey="y" name="Y" domain={[-4, 4]} tickFormatter={(tick) => typeof tick === 'number' ? tick.toFixed(1) : tick}>
                            <Label value="Y Variable" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-20} />
                        </YAxis>
                        <Tooltip 
                            cursor={{ strokeDasharray: '3 3' }} 
                            contentStyle={{ backgroundColor: '#1E1E1E' }} 
                            itemStyle={{ color: '#E0E0E0' }} 
                            formatter={tooltipFormatter} 
                        />
                        <Scatter name="Sample Data" data={data} fill="#22d3ee" shape="circle" />
                    </ScatterChart>
                 </ResponsiveContainer>
            </div>
        </div>
    );
};
export default PearsonCorrelationChart;