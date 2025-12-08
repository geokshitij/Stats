
import React, { useState, useMemo } from 'react';
import { ComposedChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Area, ReferenceLine, ResponsiveContainer } from 'recharts';
import { MathUtils } from '../../utils/math';

const TypeErrorsChart: React.FC = () => {
    const [alpha, setAlpha] = useState(0.05);
    const [effectSize, setEffectSize] = useState(2); // In units of std dev

    const { h0Data, h1Data, rejectionRegion, beta } = useMemo(() => {
        const sigma = 1;
        const h0_mu = 0;
        const h1_mu = effectSize;
        
        const generateData = (mu: number) => {
            const data = [];
            for (let x = -5; x <= 8; x += 0.1) {
                const density = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
                data.push({ x, y: density });
            }
            return data;
        };

        const h0Data = generateData(h0_mu);
        const h1Data = generateData(h1_mu);

        const rejectionRegion = MathUtils.normalQuantile(1 - alpha) * sigma + h0_mu;

        // Calculate Beta: P(X < rejectionRegion | H1 is true)
        const z_score_for_beta = (rejectionRegion - h1_mu) / sigma;
        const beta = 0.5 * (1 + (x => { const sign = x >= 0 ? 1 : -1; x = Math.abs(x); const t = 1.0 / (1.0 + 0.3275911 * x); const y = 1.0 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return sign * y; })(z_score_for_beta / Math.sqrt(2)));

        return { h0Data, h1Data, rejectionRegion, beta };
    }, [alpha, effectSize]);
    
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

    const labelFormatter = (label: number) => `Value: ${label.toFixed(1)}`;

    return (
         <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                 <div className="bg-gray-800/50 p-4 rounded-lg">
                    <label className="flex justify-between items-center text-gray-300 mb-2">
                        <span>Significance Level (α)</span>
                        <span className="font-mono bg-gray-700 px-2 py-1 rounded text-cyan-400">{alpha.toFixed(2)}</span>
                    </label>
                    <input type="range" min="0.01" max="0.20" step="0.01" value={alpha} onChange={e => setAlpha(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                    <label className="flex justify-between items-center text-gray-300 mb-2">
                        <span>Effect Size (d)</span>
                        <span className="font-mono bg-gray-700 px-2 py-1 rounded text-cyan-400">{effectSize.toFixed(1)}</span>
                    </label>
                    <input type="range" min="0.5" max="4" step="0.1" value={effectSize} onChange={e => setEffectSize(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500" />
                </div>
            </div>
            <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                 <ResponsiveContainer>
                    <ComposedChart data={h0Data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                        <XAxis type="number" dataKey="x" domain={[-4, 8]} tickFormatter={(tick) => tick.toFixed(1)}>
                            <Label value="Value" offset={-15} position="insideBottom" fill="#a0aec0" />
                        </XAxis>
                        <YAxis domain={[0, 0.5]}>
                            <Label value="Density" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-20} />
                        </YAxis>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1E1E1E' }} 
                            formatter={tooltipFormatter}
                            labelFormatter={labelFormatter}
                        />
                        
                        {/* H0 Distribution */}
                        <Area type="monotone" dataKey="y" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.3} name="H₀ (Null)" />

                        {/* H1 Distribution */}
                        <Area type="monotone" data={h1Data} dataKey="y" stroke="#f472b6" fill="#f472b6" fillOpacity={0.3} name="H₁ (Alternative)" />

                        {/* Alpha Area */}
                        <Area type="monotone" dataKey="y" stroke="none" fill="#e11d48" fillOpacity={0.7} name={`α = ${alpha.toFixed(3)}`} data={h0Data.filter(d => d.x >= rejectionRegion)} />
                        
                        {/* Beta Area */}
                         <Area type="monotone" dataKey="y" stroke="none" fill="#f97316" fillOpacity={0.7} name={`β = ${beta.toFixed(3)}`} data={h1Data.filter(d => d.x < rejectionRegion)} />

                        <ReferenceLine x={rejectionRegion} stroke="white" strokeDasharray="4 4">
                            <Label value="Critical Value" position="top" fill="white" />
                        </ReferenceLine>
                    </ComposedChart>
                 </ResponsiveContainer>
            </div>
        </div>
    )
};

export default TypeErrorsChart;
