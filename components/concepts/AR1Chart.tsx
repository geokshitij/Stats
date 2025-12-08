
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label
} from 'recharts';

const randomStandardNormal = (): number => {
    let u1, u2;
    do { u1 = Math.random(); } while (u1 === 0);
    do { u2 = Math.random(); } while (u2 === 0);
    return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
};

const LaggedTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-gray-800 border border-gray-600 p-3 rounded-md shadow-lg text-sm text-gray-200">
                <p className="font-mono">x<sub>t</sub> : {data.xt.toFixed(2)}</p>
                <p className="font-mono">x<sub>t+1</sub> : {data.xtp1.toFixed(2)}</p>
            </div>
        );
    }
    return null;
};

const AR1Chart: React.FC = () => {
    const [params, setParams] = useState({
        phi: 0.8,
        mu: 10,
        sigma: 1.5,
        sampleSize: 100,
    });
    const [series, setSeries] = useState<{t: number, value: number}[]>([]);

    const generateData = useCallback(() => {
        const { phi, mu, sigma, sampleSize } = params;
        const newData = [];
        let prev_z = 0; 
        for (let i = 0; i < sampleSize; i++) {
            const epsilon = randomStandardNormal() * sigma;
            const current_z = phi * prev_z + epsilon;
            const value = mu + current_z;
            newData.push({ t: i + 1, value });
            prev_z = current_z;
        }
        setSeries(newData);
    }, [params]);

    useEffect(generateData, [generateData]);

    const { laggedData, r1, sampleMean } = useMemo(() => {
        if (series.length < 2) return { laggedData: [], r1: 0, sampleMean: 0 };
        const lagged = [];
        for (let i = 0; i < series.length - 1; i++) {
            lagged.push({ xt: series[i].value, xtp1: series[i+1].value });
        }

        const n = series.length;
        const mean = series.reduce((sum, d) => sum + d.value, 0) / n;
        
        let numerator = 0;
        let denominator = 0;

        for (let t = 0; t < n - 1; t++) {
            numerator += (series[t].value - mean) * (series[t+1].value - mean);
        }
        for (let t = 0; t < n; t++) {
            denominator += Math.pow(series[t].value - mean, 2);
        }
        
        const r1 = denominator === 0 ? 0 : numerator / denominator;

        return { laggedData: lagged, r1, sampleMean: mean };
    }, [series]);

    const handleParamChange = (field: string, value: number) => {
        setParams(p => ({ ...p, [field]: value }));
    };

    const ParamSlider: React.FC<{ name: string, field: keyof typeof params, min: number, max: number, step: number }> = ({ name, field, min, max, step }) => (
        <div className="flex-1">
            <label className="flex justify-between items-center text-gray-300 mb-2">
                <span>{name}</span>
                <span className="font-mono bg-gray-700 px-2 py-1 rounded text-cyan-400">{params[field].toFixed(2)}</span>
            </label>
            <input type="range" min={min} max={max} step={step} value={params[field]}
                   onChange={e => handleParamChange(field, parseFloat(e.target.value))}
                   className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
        </div>
    );

    return (
        <div className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 bg-gray-800/50 p-6 rounded-lg">
                <ParamSlider name="AR Parameter (φ)" field="phi" min={-0.99} max={0.99} step={0.01} />
                <ParamSlider name="Mean (μ)" field="mu" min={-10} max={20} step={0.5} />
                <ParamSlider name="Noise (σ_ε)" field="sigma" min={0.1} max={5} step={0.1} />
                <ParamSlider name="Sample Size (n)" field="sampleSize" min={20} max={200} step={10} />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Sample Mean (x&#772;)</h4><p className="font-mono text-white text-2xl">{sampleMean.toFixed(2)}</p></div>
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Estimated φ (r₁)</h4><p className="font-mono text-white text-2xl">{r1.toFixed(3)}</p></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                     <h4 className="text-center font-semibold text-gray-400 mb-2">Generated AR(1) Time Series</h4>
                     <ResponsiveContainer>
                        <ComposedChart data={series} margin={{ top: 5, right: 20, bottom: 20, left: 10 }}>
                             <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                             <XAxis dataKey="t" type="number" domain={['dataMin', 'dataMax']}>
                                 <Label value="Time (t)" offset={-15} position="insideBottom" fill="#a0aec0" />
                             </XAxis>
                             <YAxis domain={['auto', 'auto']}>
                                  <Label value="Value (x)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-5} />
                             </YAxis>
                             <Tooltip contentStyle={{ backgroundColor: '#1E1E1E' }} formatter={(v:number) => v.toFixed(2)} labelFormatter={(label: number) => `Time: ${label}`} />
                             <Line type="monotone" dataKey="value" stroke="#22d3ee" dot={false} strokeWidth={2} />
                        </ComposedChart>
                     </ResponsiveContainer>
                 </div>
                 <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                    <h4 className="text-center font-semibold text-gray-400 mb-2">Lagged Scatter Plot</h4>
                    <ResponsiveContainer>
                        <ComposedChart data={laggedData} margin={{ top: 5, right: 20, bottom: 20, left: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                            <XAxis dataKey="xt" type="number" domain={['auto', 'auto']}>
                                <Label value="x_t" offset={-15} position="insideBottom" fill="#a0aec0" />
                             </XAxis>
                             <YAxis dataKey="xtp1" type="number" domain={['auto', 'auto']}>
                                 <Label value="x_{t+1}" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-5} />
                             </YAxis>
                             <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<LaggedTooltip />} />
                             <Scatter data={laggedData} fill="#f472b6" shape="circle" opacity={0.6} />
                        </ComposedChart>
                    </ResponsiveContainer>
                 </div>
            </div>
        </div>
    );
};
export default AR1Chart;
