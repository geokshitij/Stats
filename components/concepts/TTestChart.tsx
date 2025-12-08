import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ComposedChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Area, ReferenceLine, ResponsiveContainer } from 'recharts';
import { MathUtils } from '../../utils/math';
import { distributions as allDistributions } from '../../data/distributions';

const TTestChart: React.FC = () => {
    const [params, setParams] = useState({
        mean1: 10, std1: 2, n1: 30,
        mean2: 11.5, std2: 2, n2: 30,
    });
    const [sample1, setSample1] = useState<number[]>([]);
    const [sample2, setSample2] = useState<number[]>([]);

    const gaussianDist = allDistributions.find(d => d.id === 'gaussian');

    const generateSamples = useCallback(() => {
        if (!gaussianDist) return;
        const s1 = MathUtils.generateSample(gaussianDist, { mu: params.mean1, sigma: params.std1 }, params.n1);
        const s2 = MathUtils.generateSample(gaussianDist, { mu: params.mean2, sigma: params.std2 }, params.n2);
        setSample1(s1);
        setSample2(s2);
    }, [params, gaussianDist]);

    useEffect(generateSamples, [generateSamples]);

    const { tStat, df, criticalValue, sampleMean1, sampleMean2 } = useMemo(() => {
        if (sample1.length < 2 || sample2.length < 2) return { tStat: NaN, df: 0, pValueApproximation: NaN, criticalValue: NaN, sampleMean1: NaN, sampleMean2: NaN };

        const m1 = sample1.reduce((a, b) => a + b, 0) / sample1.length;
        const m2 = sample2.reduce((a, b) => a + b, 0) / sample2.length;
        const v1 = sample1.reduce((a, b) => a + (b - m1) ** 2, 0) / (sample1.length - 1);
        const v2 = sample2.reduce((a, b) => a + (b - m2) ** 2, 0) / (sample2.length - 1);

        const df = sample1.length + sample2.length - 2;
        const pooledStd = Math.sqrt(((sample1.length - 1) * v1 + (sample2.length - 1) * v2) / df);
        const tStat = (m1 - m2) / (pooledStd * Math.sqrt(1 / sample1.length + 1 / sample2.length));
        
        // Approximation for critical value, good for df > 30
        const criticalValue = MathUtils.normalQuantile(1 - 0.05 / 2); 
        
        return { tStat, df, criticalValue, sampleMean1: m1, sampleMean2: m2 };
    }, [sample1, sample2]);
    
    const tDistData = useMemo(() => {
        if (df <= 0) return [];
        const data = [];
        const pdf = (t: number) => {
            const num = MathUtils.gamma((df + 1) / 2);
            const den = Math.sqrt(df * Math.PI) * MathUtils.gamma(df / 2) * Math.pow(1 + t*t/df, (df+1)/2);
            return num/den;
        };
        for(let t = -4; t<=4; t+=0.1) {
            const d = pdf(t);
            data.push({
                t, 
                density: d,
                rejectionArea: (t <= -criticalValue || t >= criticalValue) ? d : null
            });
        }
        return data;
    }, [df, criticalValue]);

    const handleParamChange = (field: string, value: number) => {
        setParams(p => ({ ...p, [field]: value }));
    };

    const ParamSlider: React.FC<{ name: string, field: string, min: number, max: number, step: number, group: number }> = ({name, field, min, max, step, group}) => (
        <div>
            <label className="flex justify-between items-center text-gray-300 mb-2">
                <span>{name} (Group {group})</span>
                <span className={`font-mono bg-gray-700 px-2 py-1 rounded ${group === 1 ? 'text-cyan-400' : 'text-pink-400'}`}>{params[field]}</span>
            </label>
            <input type="range" min={min} max={max} step={step} value={params[field]}
                   onChange={e => handleParamChange(field, parseFloat(e.target.value))}
                   className={`w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer ${group === 1 ? 'accent-cyan-500' : 'accent-pink-500'}`} />
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
    
    const labelFormatter = (label: number) => `t-statistic: ${label.toFixed(3)}`;


    return (
        <div className="w-full">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-gray-800/50 p-6 rounded-lg mb-4">
                <ParamSlider name="Mean (μ)" field="mean1" min={5} max={15} step={0.1} group={1} />
                <ParamSlider name="Mean (μ)" field="mean2" min={5} max={15} step={0.1} group={2} />
                <ParamSlider name="Std Dev (σ)" field="std1" min={1} max={5} step={0.1} group={1} />
                <ParamSlider name="Std Dev (σ)" field="std2" min={1} max={5} step={0.1} group={2} />
                <ParamSlider name="Sample Size (n)" field="n1" min={5} max={100} step={1} group={1} />
                <ParamSlider name="Sample Size (n)" field="n2" min={5} max={100} step={1} group={2} />
            </div>
             <div className="text-center mb-4">
                 <button onClick={generateSamples} className="bg-gray-700 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Generate New Samples</button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
                 <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Sample Mean 1</h4><p className="font-mono text-cyan-400 text-2xl">{sampleMean1.toFixed(2)}</p></div>
                 <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Sample Mean 2</h4><p className="font-mono text-pink-400 text-2xl">{sampleMean2.toFixed(2)}</p></div>
                 <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">t-statistic</h4><p className="font-mono text-white text-2xl">{tStat.toFixed(2)}</p></div>
            </div>
            <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                <p className="text-sm text-gray-400 text-center -mt-2 mb-2">Null distribution for t-statistic with {df} degrees of freedom.</p>
                <ResponsiveContainer>
                    <ComposedChart data={tDistData} margin={{ top: 25, right: 30, bottom: 20, left: 20 }}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                        <XAxis type="number" dataKey="t" domain={[-4, 4]} tickFormatter={(tick) => tick.toFixed(1)}>
                            <Label value="t-statistic" offset={-15} position="insideBottom" fill="#a0aec0" />
                        </XAxis>
                        <YAxis>
                             <Label value="Density" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-20} />
                        </YAxis>
                        <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', color: '#E0E0E0' }} formatter={tooltipFormatter} labelFormatter={labelFormatter} />
                        <Area type="monotone" dataKey="density" stroke="#a0aec0" fill="#a0aec0" fillOpacity={0.2} name="t-distribution" />
                        <Area type="monotone" dataKey="rejectionArea" stroke="none" fill="#e11d48" fillOpacity={0.7} name="Rejection Region (α=0.05)" />
                        <ReferenceLine x={tStat} stroke="#22d3ee" strokeWidth={3}>
                            <Label value="Observed t" position="top" fill="#22d3ee" />
                        </ReferenceLine>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default TTestChart;