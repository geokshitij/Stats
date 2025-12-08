
import React, { useState, useMemo } from 'react';
import { ComposedChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Area, ReferenceLine, ResponsiveContainer } from 'recharts';
import { MathUtils } from '../../utils/math';

const ZTestChart: React.FC = () => {
    const [params, setParams] = useState({
        popMean: 100,
        popStd: 15,
        sampleMean: 105,
        sampleSize: 30,
    });

    const { zStat, pValue, criticalValue } = useMemo(() => {
        const { popMean, popStd, sampleMean, sampleSize } = params;
        if (sampleSize <= 0 || popStd <= 0) return { zStat: NaN, pValue: NaN, criticalValue: NaN };

        const zStat = (sampleMean - popMean) / (popStd / Math.sqrt(sampleSize));
        const pValue = 2 * (1 - MathUtils.normalCdf(Math.abs(zStat))); // Two-tailed p-value
        const criticalValue = MathUtils.normalQuantile(1 - 0.05 / 2); // Two-tailed critical value for α=0.05

        return { zStat, pValue, criticalValue };
    }, [params]);

    const normalDistData = useMemo(() => {
        const data = [];
        const pdf = (x: number) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
        for (let x = -4; x <= 4; x += 0.1) {
            const d = pdf(x);
            data.push({
                z: x,
                density: d,
                rejectionArea: (x <= -criticalValue || x >= criticalValue) ? d : null
            });
        }
        return data;
    }, [criticalValue]);

    const handleParamChange = (field: string, value: number) => {
        setParams(p => ({ ...p, [field]: value }));
    };

    const ParamSlider: React.FC<{ name: string, field: keyof typeof params, min: number, max: number, step: number }> = ({ name, field, min, max, step }) => (
        <div>
            <label className="flex justify-between items-center text-gray-300 mb-2">
                <span>{name}</span>
                <span className="font-mono bg-gray-700 px-2 py-1 rounded text-cyan-400">{params[field]}</span>
            </label>
            <input type="range" min={min} max={max} step={step} value={params[field]}
                   onChange={e => handleParamChange(field, parseFloat(e.target.value))}
                   className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
        </div>
    );
    
    const tooltipFormatter = (value: unknown) => {
      if (typeof value === 'number') {
        return value.toFixed(4);
      }
      if (typeof value === 'string') {
        return value;
      }
      return null;
    };
    
    const labelFormatter = (label: number) => `Z-statistic: ${label.toFixed(2)}`;

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-gray-800/50 p-6 rounded-lg mb-4">
                <ParamSlider name="Population Mean (μ₀)" field="popMean" min={90} max={110} step={0.5} />
                <ParamSlider name="Population Std Dev (σ)" field="popStd" min={5} max={25} step={0.5} />
                <ParamSlider name="Sample Mean (x̄)" field="sampleMean" min={90} max={110} step={0.5} />
                <ParamSlider name="Sample Size (n)" field="sampleSize" min={2} max={200} step={1} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Z-statistic</h4><p className="font-mono text-white text-2xl">{zStat.toFixed(2)}</p></div>
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">P-value</h4><p className="font-mono text-white text-2xl">{pValue.toFixed(3)}</p></div>
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Result (α=0.05)</h4><p className={`font-bold text-2xl ${Math.abs(zStat) > criticalValue ? 'text-pink-400' : 'text-green-400'}`}>{Math.abs(zStat) > criticalValue ? 'Reject H₀' : 'Fail to Reject H₀'}</p></div>
            </div>
            <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                <p className="text-sm text-gray-400 text-center -mt-2 mb-2">Standard Normal Distribution (Null Distribution for Z-statistic)</p>
                <ResponsiveContainer>
                    <ComposedChart data={normalDistData} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                        <XAxis type="number" dataKey="z" domain={[-4, 4]} tickFormatter={(tick) => tick.toFixed(1)}>
                            <Label value="Z-statistic" offset={-15} position="insideBottom" fill="#a0aec0" />
                        </XAxis>
                        <YAxis>
                           <Label value="Density" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-20} />
                        </YAxis>
                        <Tooltip contentStyle={{ backgroundColor: '#1E1E1E' }} formatter={tooltipFormatter} labelFormatter={labelFormatter} />
                        <Area type="monotone" dataKey="density" stroke="#a0aec0" fill="#a0aec0" fillOpacity={0.2} name="Standard Normal" />
                        <Area type="monotone" dataKey="rejectionArea" stroke="none" fill="#e11d48" fillOpacity={0.7} name="Rejection Region (α=0.05)" />
                        <ReferenceLine x={zStat} stroke="#22d3ee" strokeWidth={3}>
                            <Label value="Observed Z" position="top" fill="#22d3ee" />
                        </ReferenceLine>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ZTestChart;
