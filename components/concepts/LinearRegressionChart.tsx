import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const scatterPayload = payload.find(p => p.name === 'Sample Data');
        if (scatterPayload) {
            const { x, y } = scatterPayload.payload;
            return (
                <div className="bg-gray-800 border border-gray-600 p-3 rounded-md shadow-lg text-sm text-gray-200">
                    <p className="font-mono">X : {x.toFixed(2)}</p>
                    <p className="font-mono">Y : {y.toFixed(2)}</p>
                </div>
            );
        }
    }
    return null;
};

const LinearRegressionChart: React.FC = () => {
    const [params, setParams] = useState({
        intercept: 5,
        slope: 2,
        noise: 2,
        sampleSize: 100,
        heteroscedasticity: 0,
    });
    const [data, setData] = useState<{x: number, y: number}[]>([]);
    
    const generateData = useCallback(() => {
        const { intercept, slope, noise, sampleSize, heteroscedasticity } = params;
        const newData = [];
        for (let i = 0; i < sampleSize; i++) {
            const x = Math.random() * 10;
            // Introduce heteroscedasticity: error variance increases with x
            const currentNoise = noise + heteroscedasticity * x;
            const error = (Math.random() - 0.5) * currentNoise * 2;
            const y = intercept + slope * x + error;
            newData.push({ x, y });
        }
        setData(newData);
    }, [params]);

    useEffect(() => {
        generateData();
    }, [generateData]);

    const { a, b, rSquared, sse, regressionLineData } = useMemo(() => {
        if (data.length < 2) return { a: 0, b: 0, rSquared: 0, sse: 0, regressionLineData: [] };
        
        const n = data.length;
        const meanX = data.reduce((sum, d) => sum + d.x, 0) / n;
        const meanY = data.reduce((sum, d) => sum + d.y, 0) / n;
        
        let numerator = 0;
        let denominator = 0;
        for (const d of data) {
            numerator += (d.x - meanX) * (d.y - meanY);
            denominator += Math.pow(d.x - meanX, 2);
        }

        const b = denominator === 0 ? 0 : numerator / denominator;
        const a = meanY - b * meanX;

        let sse = 0;
        let sst = 0;
        for (const d of data) {
            const y_hat = a + b * d.x;
            sse += Math.pow(d.y - y_hat, 2);
            sst += Math.pow(d.y - meanY, 2);
        }

        const rSquared = sst === 0 ? 1 : 1 - (sse / sst);
        
        const minX = Math.min(...data.map(d => d.x));
        const maxX = Math.max(...data.map(d => d.x));
        const regressionLineData = [
            { x: minX, y: a + b * minX },
            { x: maxX, y: a + b * maxX },
        ];

        return { a, b, rSquared, sse, regressionLineData };
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

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-4 bg-gray-800/50 p-6 rounded-lg mb-4">
                <ParamSlider name="True Intercept" field="intercept" min={-10} max={10} step={0.5} />
                <ParamSlider name="True Slope" field="slope" min={-5} max={5} step={0.1} />
                <ParamSlider name="Base Noise" field="noise" min={0} max={10} step={0.5} />
                <ParamSlider name="Heteroscedasticity" field="heteroscedasticity" min={0} max={3} step={0.1} />
                <ParamSlider name="Sample Size (n)" field="sampleSize" min={10} max={500} step={10} />
            </div>
             <div className="text-center mb-4">
                 <button onClick={generateData} className="bg-gray-700 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Generate New Sample</button>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg text-center mb-4">
                <p className="font-mono text-xl text-white">
                    Estimated Line: <span className="text-cyan-400">y&#770; = {a.toFixed(2)} + {b.toFixed(2)}x</span>
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Est. Intercept (a)</h4><p className="font-mono text-white text-2xl">{a.toFixed(2)}</p></div>
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Est. Slope (b)</h4><p className="font-mono text-white text-2xl">{b.toFixed(2)}</p></div>
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">R-Squared</h4><p className="font-mono text-white text-2xl">{rSquared.toFixed(3)}</p></div>
            </div>
            <div className="w-full h-96 bg-gray-800 p-4 rounded-lg shadow-inner">
                 <ResponsiveContainer>
                    <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                        <XAxis type="number" dataKey="x" name="X" domain={[0, 10]} tickFormatter={(tick) => typeof tick === 'number' ? tick.toFixed(1) : tick}>
                             <Label value="Independent Variable (X)" offset={-15} position="insideBottom" fill="#a0aec0" />
                        </XAxis>
                        <YAxis type="number" dataKey="y" name="Y" domain={['auto', 'auto']} tickFormatter={(tick) => typeof tick === 'number' ? tick.toFixed(1) : tick}>
                            <Label value="Dependent Variable (Y)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-10} />
                        </YAxis>
                        <Tooltip 
                            cursor={{ strokeDasharray: '3 3' }} 
                            content={<CustomTooltip />}
                        />
                        <Scatter name="Sample Data" data={data} fill="#a0aec0" shape="circle" opacity={0.6} />
                        <Line data={regressionLineData} dataKey="y" stroke="#22d3ee" strokeWidth={3} dot={false} isAnimationActive={false} name="Regression Line" />
                    </ComposedChart>
                 </ResponsiveContainer>
            </div>
        </div>
    );
};
export default LinearRegressionChart;