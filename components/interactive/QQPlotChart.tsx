import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  ComposedChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Scatter, Line, ResponsiveContainer
} from 'recharts';
import { Distribution } from '../../types';
import { MathUtils } from '../../utils/math';

// Custom Tooltip Component for complete control over display
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const theoreticalQuantile = label;
        const sampleQuantilePayload = payload.find(p => p.dataKey === 'sampleQuantile');
        const referenceLinePayload = payload.find(p => p.dataKey === 'lineValue');
        
        const sampleQuantile = sampleQuantilePayload?.value;
        const referenceLine = referenceLinePayload?.value;

        return (
            <div className="bg-[#2D2D2D] border border-[#424242] p-3 rounded-md shadow-lg text-sm">
                <p className="font-bold text-white mb-2">
                    Theoretical Quantile: {typeof theoreticalQuantile === 'number' ? theoreticalQuantile.toFixed(4) : theoreticalQuantile}
                </p>
                <p className="text-white">
                    Sample Quantile: {typeof sampleQuantile === 'number' ? sampleQuantile.toFixed(4) : 'N/A'}
                </p>
                <p style={{ color: '#f87171' }}>
                    Reference Line: {typeof referenceLine === 'number' ? referenceLine.toFixed(4) : 'N/A'}
                </p>
            </div>
        );
    }
    return null;
};


const QQPlotChart: React.FC<{ distribution: Distribution; params: { [key: string]: number } }> = ({ distribution, params }) => {
    const [sample, setSample] = useState<number[]>([]);
    
    const generateNewSample = useCallback(() => {
        setSample(MathUtils.generateSample(distribution, params, 100));
    }, [distribution, params]);
    
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
        if (Math.abs(value) >= 1e6) {
            return value.toExponential(1);
        }
        if (Math.abs(value) >= 1000) {
            return (value / 1000).toFixed(0) + 'k';
        }
        if (value % 1 !== 0) {
            return value.toFixed(2);
        }
        return value.toLocaleString();
    };

    return (
       <div className="w-full h-96 bg-gray-800 p-4 rounded-lg shadow-inner flex flex-col">
        <p className="text-sm text-gray-400 text-center mb-2">Compares sample quantiles to theoretical Normal quantiles. Points on the red line suggest normality.</p>
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={quantileDataWithLine} margin={{ top: 20, right: 20, bottom: 20, left: 35 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                 <XAxis type="number" dataKey="theoreticalQuantile" stroke="#a0aec0" domain={['dataMin', 'dataMax']} tickFormatter={(tick) => typeof tick === 'number' ? tick.toFixed(2) : tick}>
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
         <button 
            onClick={generateNewSample}
            className="mt-4 bg-gray-700 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 self-center">
            Generate New Sample (n=100)
        </button>
      </div>
    );
};

export default QQPlotChart;