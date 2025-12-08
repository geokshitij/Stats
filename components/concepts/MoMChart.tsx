
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { MathUtils } from '../../utils/math';
import { distributions as allDistributions } from '../../data/distributions';

const MoMChart: React.FC = () => {
    const [distId, setDistId] = useState('gamma');
    const [sample, setSample] = useState<number[]>([]);
    const [estimates, setEstimates] = useState<{ [key: string]: number }>({});
    const [trueParams, setTrueParams] = useState<{ [key: string]: number }>({ alpha: 5, beta: 2 });

    const supportedDists = allDistributions.filter(d => ['gamma', 'gaussian'].includes(d.id));
    
    const generateNewSample = useCallback(() => {
        const dist = allDistributions.find(d => d.id === distId);
        if (!dist) return;
        
        const newSample = MathUtils.generateSample(dist, trueParams, 100);
        setSample(newSample);

        // Calculate MoM estimates
        const n = newSample.length;
        const mean = newSample.reduce((a, b) => a + b, 0) / n;
        const variance = newSample.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n -1);

        let newEstimates = {};
        if (dist.id === 'gamma') {
            const alpha_hat = Math.pow(mean, 2) / variance;
            const beta_hat = variance / mean;
            newEstimates = { 'α (Shape)': alpha_hat, 'β (Scale)': beta_hat };
        } else if (dist.id === 'gaussian') {
            const mu_hat = mean;
            const sigma_hat = Math.sqrt(variance);
            newEstimates = { 'μ (Mean)': mu_hat, 'σ (Std. Dev.)': sigma_hat };
        }
        setEstimates(newEstimates);

    }, [distId, trueParams]);

    useEffect(() => {
        generateNewSample();
    }, [generateNewSample]);

    return (
        <div className="w-full">
            <div className="bg-gray-800/50 p-4 rounded-lg mb-4 flex items-center space-x-4">
                <label htmlFor="dist-select" className="text-gray-300 font-semibold">Distribution:</label>
                <select id="dist-select" value={distId} onChange={e => setDistId(e.target.value)} className="bg-gray-700 text-white rounded-md p-2">
                    {supportedDists.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
                <button onClick={generateNewSample} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Generate New Sample (n=100)
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                 <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold text-cyan-400 mb-2">True Parameters</h4>
                    {Object.entries(trueParams).map(([key, val]) => <p key={key} className="font-mono">{key}: {(val as number).toFixed(2)}</p>)}
                 </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold text-cyan-400 mb-2">Sample Moments</h4>
                    <p className="font-mono">Mean: { (sample.reduce((a,b)=>a+b,0)/sample.length).toFixed(2) }</p>
                    <p className="font-mono">Variance: { (sample.reduce((a,b)=>a+Math.pow(b - (sample.reduce((c,d)=>c+d,0)/sample.length),2),0)/(sample.length-1)).toFixed(2) }</p>
                 </div>
                 <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold text-cyan-400 mb-2">MoM Estimates</h4>
                     {Object.entries(estimates).map(([key, val]) => <p key={key} className="font-mono">{key}: {(val as number).toFixed(2)}</p>)}
                 </div>
            </div>
        </div>
    );
};

export default MoMChart;
