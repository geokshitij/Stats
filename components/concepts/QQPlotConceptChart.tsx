
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  ComposedChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Scatter, Line, ResponsiveContainer
} from 'recharts';
import { MathUtils } from '../../utils/math';
import { distributions } from '../../data/distributions';
import { Distribution } from '../../types';

// Custom Tooltip from the other QQ plot component
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const theoreticalQuantile = label;
        const sampleQuantilePayload = payload.find(p => p.dataKey === 'sampleQuantile');
        
        const sampleQuantile = sampleQuantilePayload?.value;

        return (
            <div className="bg-[#2D2D2D] border border-[#424242] p-3 rounded-md shadow-lg text-sm">
                <p className="font-bold text-white mb-2">
                    Theoretical (Normal) Quantile: {typeof theoreticalQuantile === 'number' ? theoreticalQuantile.toFixed(4) : theoreticalQuantile}
                </p>
                <p className="text-white">
                    Sample Quantile: {typeof sampleQuantile === 'number' ? sampleQuantile.toFixed(4) : 'N/A'}
                </p>
            </div>
        );
    }
    return null;
};


const QQPlotConceptChart: React.FC = () => {
    const [distId, setDistId] = useState<'gaussian' | 'gamma' | 'uniform'>('gaussian');
    const [sample, setSample] = useState<number[]>([]);
    
    const generateNewSample = useCallback(() => {
        const dist = distributions.find(d => d.id === distId);
        let params = {};
        if (distId === 'gaussian') {
            params = { mu: 0, sigma: 1 };
        } else if (distId === 'gamma') {
            params = { alpha: 2, beta: 2 };
        }

        let newSample: number[];
        if (dist) {
            newSample = MathUtils.generateSample(dist, params, 100);
        } else { // uniform case
            newSample = Array.from({length: 100}, () => Math.random() * 10);
        }
        setSample(newSample.sort((a,b) => a-b));
    }, [distId]);
    
    useEffect(() => {
        generateNewSample();
    }, [generateNewSample]);

    const quantileDataWithLine = useMemo(() => {
        const data = MathUtils.calculateQuantiles(sample);
        if (data.length < 4) return data;

        const n = data.length;
        const q1_index = Math.floor(n * 0.25);
        const q3_index = Math.floor(n * 0.75);
        const q1 = data[q1_index];
        const q3 = data[q3_index];

        if (!q1 || !q3 || Math.abs(q3.theoreticalQuantile - q1.theoreticalQuantile) < 1e-6) {
            return data.map(p => ({ ...p, lineValue: p.sampleQuantile })); // Fallback
        }

        const slope = (q3.sampleQuantile - q1.sampleQuantile) / (q3.theoreticalQuantile - q1.theoreticalQuantile);
        const intercept = q1.sampleQuantile - slope * q1.theoreticalQuantile;
        
        return data.map(point => ({
            ...point,
            lineValue: slope * point.theoreticalQuantile + intercept
        }));
    }, [sample]);

    const yAxisTickFormatter = (value: number) => {
        if (value % 1 !== 0) {
            return value.toFixed(1);
        }
        return value;
    };

    return (
       <div className="w-full">
         <div className="bg-gray-800/50 p-4 rounded-lg mb-4 flex items-center space-x-4">
                <label htmlFor="dist-type-select" className="text-gray-300 font-semibold">Sample from:</label>
                <select id="dist-type-select" value={distId} onChange={e => setDistId(e.target.value as any)} className="bg-gray-700 text-white rounded-md p-2">
                    <option value="gaussian">Normal Distribution</option>
                    <option value="gamma">Gamma (Skewed)</option>
                    <option value="uniform">Uniform (Light Tails)</option>
                </select>
                <button onClick={generateNewSample} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Generate New Sample (n=100)
                </button>
            </div>
        <div className="w-full h-96 bg-gray-800 p-4 rounded-lg shadow-inner flex flex-col">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={quantileDataWithLine} margin={{ top: 20, right: 20, bottom: 20, left: 35 }}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                     <XAxis type="number" dataKey="theoreticalQuantile" stroke="#a0aec0" domain={['dataMin', 'dataMax']} tickFormatter={(tick) => typeof tick === 'number' ? tick.toFixed(1) : tick}>
                         <Label value="Theoretical Quantiles (Normal)" offset={-15} position="insideBottom" fill="#a0aec0" />
                     </XAxis>
                     <YAxis type="number" name="Sample Quantiles" stroke="#a0aec0" domain={['dataMin', 'dataMax']} allowDataOverflow tickFormatter={yAxisTickFormatter}>
                        <Label value="Sample Quantiles" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-30} />
                     </YAxis>
                     <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }} 
                        content={<CustomTooltip />}
                     />
                     <Scatter dataKey="sampleQuantile" fill="#22d3ee" name="Sample Quantile" />
                     <Line type="monotone" dataKey="lineValue" stroke="#f87171" dot={false} strokeWidth={2} isAnimationActive={false} name="Reference Line"/>
                </ComposedChart>
            </ResponsiveContainer>
        </div>
      </div>
    );
};

export default QQPlotConceptChart;
