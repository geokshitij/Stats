
import React, { useState, useMemo } from 'react';
import { ComposedChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Area, ReferenceLine, ResponsiveContainer } from 'recharts';
import { MathUtils } from '../../utils/math';

const FDistributionChart: React.FC = () => {
    const [params, setParams] = useState({
        d1: 3, // Numerator DF
        d2: 20, // Denominator DF
        observedF: 3.10
    });

    const { criticalValue } = useMemo(() => {
        const { d1, d2 } = params;
        if (d1 <= 0 || d2 <= 0) return { criticalValue: NaN };
        const criticalValue = MathUtils.fDistQuantile(0.95, d1, d2);
        return { criticalValue };
    }, [params]);

    const fDistData = useMemo(() => {
        const { d1, d2, observedF } = params;
        if (d1 <= 0 || d2 <= 0) return [];
        const data = [];
        const maxX = Math.max(5, (criticalValue || 0) * 1.5, observedF * 1.2);
        const step = maxX / 100;
        for (let x = step; x <= maxX; x += step) {
            const density = MathUtils.fDistPdf(x, d1, d2);
            if (isFinite(density)) {
                 data.push({
                    x,
                    density,
                    rejectionArea: (x >= criticalValue) ? density : null
                });
            }
        }
        return data;
    }, [params, criticalValue]);

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
    
    const labelFormatter = (label: number) => `F-statistic: ${label.toFixed(2)}`;

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 bg-gray-800/50 p-6 rounded-lg mb-4">
                <ParamSlider name="Numerator df (d1)" field="d1" min={1} max={50} step={1} />
                <ParamSlider name="Denominator df (d2)" field="d2" min={1} max={100} step={1} />
                <ParamSlider name="Observed F-statistic" field="observedF" min={0} max={10} step={0.1} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mb-4">
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Critical Value (α=0.05)</h4><p className="font-mono text-red-400 text-2xl">{criticalValue.toFixed(2)}</p></div>
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Result</h4><p className={`font-bold text-2xl ${params.observedF > criticalValue ? 'text-pink-400' : 'text-green-400'}`}>{params.observedF > criticalValue ? 'Reject H₀' : 'Fail to Reject H₀'}</p></div>
            </div>
            <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                <p className="text-sm text-gray-400 text-center -mt-2 mb-2">F-Distribution with {params.d1} and {params.d2} degrees of freedom</p>
                <ResponsiveContainer>
                    <ComposedChart data={fDistData} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                        <XAxis type="number" dataKey="x" domain={['dataMin', 'dataMax']} tickFormatter={(tick) => tick.toFixed(1)}>
                            <Label value="F-statistic" offset={-15} position="insideBottom" fill="#a0aec0" />
                        </XAxis>
                        <YAxis>
                           <Label value="Density" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-20} />
                        </YAxis>
                        <Tooltip contentStyle={{ backgroundColor: '#1E1E1E' }} labelFormatter={labelFormatter} />
                        <Area type="monotone" dataKey="density" stroke="#a0aec0" fill="#a0aec0" fillOpacity={0.2} name="F-Distribution" />
                        <Area type="monotone" dataKey="rejectionArea" stroke="none" fill="#e11d48" fillOpacity={0.7} name="Rejection Region (α=0.05)" />
                        <ReferenceLine x={params.observedF} stroke="#22d3ee" strokeWidth={3}>
                            <Label value="Observed F" position="top" fill="#22d3ee" />
                        </ReferenceLine>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FDistributionChart;
