
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  ComposedChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Line, ResponsiveContainer
} from 'recharts';
import { Distribution } from '../../types';
import { MathUtils } from '../../utils/math';

const CdfEcdfChart: React.FC<{ distribution: Distribution; params: { [key: string]: number } }> = ({ distribution, params }) => {
    const [sample, setSample] = useState<number[]>([]);
    
    const generateNewSample = useCallback(() => {
        setSample(MathUtils.generateSample(distribution, params, 100));
    }, [distribution, params]);
    
    useEffect(() => {
        generateNewSample();
    }, [generateNewSample]);

    const theoreticalCdfData = useMemo(() => {
        const paramValues = distribution.parameters.map(p => params[p.id]);
        return distribution.cdfGenerator(...paramValues);
    }, [distribution, params]);

    const empiricalCdfData = useMemo(() => MathUtils.calculateEcdf(sample), [sample]);
    
    const labelFormatter = (label: number) => `Value: ${label.toFixed(2)}`;

    return (
      <div className="w-full h-96 bg-gray-800 p-4 rounded-lg shadow-inner flex flex-col">
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart margin={{ top: 5, right: 20, left: 30, bottom: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                 <XAxis type="number" dataKey="x" stroke="#a0aec0" domain={['dataMin', 'dataMax']} allowDataOverflow={true} tickFormatter={(tick) => typeof tick === 'number' ? tick.toFixed(2) : tick}>
                    <Label value="Value (x)" offset={-15} position="insideBottom" fill="#a0aec0" />
                 </XAxis>
                 <YAxis stroke="#a0aec0" domain={[0, 1]}>
                    <Label value="Cumulative Probability" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-20} />
                 </YAxis>
                 <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#424242' }} labelFormatter={labelFormatter} />
                 <Line data={theoreticalCdfData} type="monotone" dataKey="cdf" stroke="#22d3ee" dot={false} name="Theoretical CDF" />
                 <Line data={empiricalCdfData} type="stepAfter" dataKey="cdf" stroke="#f472b6" dot={false} name="Empirical CDF (Sample)" />
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

export default CdfEcdfChart;