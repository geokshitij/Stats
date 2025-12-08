
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ComposedChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Line, ReferenceLine, ResponsiveContainer } from 'recharts';
import { MathUtils } from '../../utils/math';
import { distributions as allDistributions } from '../../data/distributions';

const MLEChart: React.FC = () => {
    const [distId] = useState('poisson'); // For simplicity, lock to Poisson
    const [sample, setSample] = useState<number[]>([]);
    const [trueLambda, setTrueLambda] = useState(5);

    const { logLikelihoodData, mleEstimate } = useMemo(() => {
        const dist = allDistributions.find(d => d.id === 'poisson');
        if (!dist || sample.length === 0) return { logLikelihoodData: [], mleEstimate: 0 };
        
        const factorial = (n: number): number => {
            if (n < 0) return Infinity;
            if (n === 0) return 1;
            let result = 1;
            for (let i = n; i > 0; i--) {
                result *= i;
            }
            return result;
        };
        const logFactorials = sample.reduce((sum, x) => sum + Math.log(factorial(x)), 0);

        const calculateLogLikelihood = (lambda: number) => {
            if (lambda <= 0) return -Infinity;
            const sumX = sample.reduce((a, b) => a + b, 0);
            return sumX * Math.log(lambda) - sample.length * lambda - logFactorials;
        };

        const data = [];
        const mle = sample.reduce((a, b) => a + b, 0) / sample.length;
        const range = Math.max(2, mle * 0.5);

        for (let l = mle - range; l <= mle + range; l += (range*2)/100) {
            if (l > 0) {
                data.push({ lambda: l, logLikelihood: calculateLogLikelihood(l) });
            }
        }
        
        return { logLikelihoodData: data, mleEstimate: mle };
    }, [sample]);

    const generateNewSample = useCallback(() => {
        const dist = allDistributions.find(d => d.id === 'poisson');
        if (!dist) return;
        const newSample = MathUtils.generateSample(dist, { lambda: trueLambda }, 50);
        setSample(newSample);
    }, [trueLambda]);
    
    useEffect(() => generateNewSample(), [generateNewSample]);

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

    return (
        <div className="w-full">
            <div className="bg-gray-800/50 p-4 rounded-lg mb-4 flex items-center space-x-4">
                <p className="text-gray-300 font-semibold">Distribution: Poisson</p>
                <button onClick={generateNewSample} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Generate New Sample (n=50)
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-center">
                 <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold text-cyan-400 mb-2">True λ</h4>
                    <p className="font-mono text-xl">{trueLambda.toFixed(2)}</p>
                 </div>
                 <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold text-cyan-400 mb-2">MLE Estimate (λ̂ = sample mean)</h4>
                     <p className="font-mono text-xl">{mleEstimate.toFixed(2)}</p>
                 </div>
            </div>
             <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                 <ResponsiveContainer>
                    <ComposedChart data={logLikelihoodData} margin={{ top: 20, right: 20, bottom: 20, left: 30 }}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                        <XAxis 
                            type="number" 
                            dataKey="lambda" 
                            domain={['dataMin', 'dataMax']}
                            tickFormatter={(tick) => typeof tick === 'number' ? tick.toFixed(1) : tick}
                        >
                             <Label value="Parameter Value (λ)" offset={-15} position="insideBottom" fill="#a0aec0" />
                        </XAxis>
                        <YAxis>
                            <Label value="Log-Likelihood" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-20} />
                        </YAxis>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1E1E1E' }}
                            formatter={tooltipFormatter}
                            labelFormatter={(label: number) => `λ: ${label.toFixed(3)}`}
                        />
                        <Line type="monotone" dataKey="logLikelihood" stroke="#22d3ee" dot={false} />
                        <ReferenceLine x={mleEstimate} stroke="#f472b6" strokeDasharray="4 4">
                             <Label value="MLE" position="top" fill="#f472b6" />
                        </ReferenceLine>
                    </ComposedChart>
                 </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MLEChart;