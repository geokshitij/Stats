
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, ReferenceLine
} from 'recharts';

const randomStandardNormal = (): number => {
    let u1, u2;
    do { u1 = Math.random(); } while (u1 === 0);
    do { u2 = Math.random(); } while (u2 === 0);
    return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
};

const ACFChart: React.FC = () => {
    const [params, setParams] = useState({
        seriesType: 'ar1',
        phi: 0.8,
        sampleSize: 100,
    });
    const [series, setSeries] = useState<{t: number, value: number}[]>([]);

    const generateData = useCallback(() => {
        const { seriesType, phi, sampleSize } = params;
        const newData = [];
        let prev_val = 0;
        for (let i = 0; i < sampleSize; i++) {
            const noise = randomStandardNormal();
            let value = 0;
            if (seriesType === 'ar1') {
                value = phi * prev_val + noise;
                prev_val = value;
            } else { // white noise
                value = noise;
            }
            newData.push({ t: i + 1, value });
        }
        setSeries(newData);
    }, [params]);

    useEffect(generateData, [generateData]);

    const { acfData, confidenceInterval } = useMemo(() => {
        if (series.length < 2) return { acfData: [], confidenceInterval: 0 };

        const n = series.length;
        const mean = series.reduce((sum, d) => sum + d.value, 0) / n;
        
        const autocovariance = (k: number) => {
            let sum = 0;
            for (let t = 0; t < n - k; t++) {
                sum += (series[t].value - mean) * (series[t + k].value - mean);
            }
            return sum / n;
        };
        
        const gamma0 = autocovariance(0);
        if (gamma0 === 0) return { acfData: [], confidenceInterval: 0 };
        
        const acf = [];
        for (let k = 1; k <= 20; k++) {
            acf.push({ lag: k, correlation: autocovariance(k) / gamma0 });
        }
        
        const confidenceInterval = 1.96 / Math.sqrt(n);

        return { acfData: acf, confidenceInterval };
    }, [series]);

    const handleParamChange = (field: string, value: string | number) => {
        setParams(p => ({ ...p, [field]: value }));
    };

    return (
        <div className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-gray-800/50 p-6 rounded-lg">
                <div>
                    <label className="flex justify-between items-center text-gray-300 mb-2"><span>Series Type</span></label>
                    <select value={params.seriesType} onChange={e => handleParamChange('seriesType', e.target.value)} className="w-full bg-gray-700 text-white rounded p-1">
                        <option value="ar1">AR(1) Process</option>
                        <option value="noise">White Noise</option>
                    </select>
                </div>
                {params.seriesType === 'ar1' && (
                    <div>
                        <label className="flex justify-between items-center text-gray-300 mb-2"><span>AR(1) Parameter (φ)</span><span className="font-mono bg-gray-700 px-2 py-1 rounded">{Number(params.phi).toFixed(2)}</span></label>
                        <input type="range" min={-0.95} max={0.95} step={0.05} value={params.phi} onChange={e => handleParamChange('phi', parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                    </div>
                )}
                 <div className="md:col-span-2 text-center">
                     <button onClick={generateData} className="bg-gray-700 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        Generate New Series
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                     <h4 className="text-center font-semibold text-gray-400 mb-2">Generated Time Series</h4>
                     <ResponsiveContainer>
                        <LineChart data={series} margin={{ top: 5, right: 20, bottom: 20, left: 10 }}>
                             <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                             <XAxis dataKey="t" type="number" domain={['dataMin', 'dataMax']}>
                                 <Label value="Time (t)" offset={-15} position="insideBottom" fill="#a0aec0" />
                             </XAxis>
                             <YAxis domain={['auto', 'auto']}>
                                  <Label value="Value" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-5} />
                             </YAxis>
                             <Tooltip contentStyle={{ backgroundColor: '#1E1E1E' }} formatter={(v:number) => v.toFixed(2)} labelFormatter={(label: number) => `Time: ${label}`} />
                             <Line type="monotone" dataKey="value" stroke="#22d3ee" dot={false} strokeWidth={2} />
                        </LineChart>
                     </ResponsiveContainer>
                 </div>
                 <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                    <h4 className="text-center font-semibold text-gray-400 mb-2">Autocorrelation Function (ACF)</h4>
                    <ResponsiveContainer>
                        <BarChart data={acfData} margin={{ top: 5, right: 20, bottom: 20, left: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                            <XAxis dataKey="lag" type="number">
                                <Label value="Lag" offset={-15} position="insideBottom" fill="#a0aec0" />
                             </XAxis>
                             <YAxis domain={[-1, 1]}>
                                 <Label value="Correlation" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-5} />
                             </YAxis>
                             <Tooltip contentStyle={{ backgroundColor: '#1E1E1E' }} formatter={(v:number) => v.toFixed(3)} />
                             <Bar dataKey="correlation" fill="#f472b6" />
                             <ReferenceLine y={confidenceInterval} stroke="#a0aec0" strokeDasharray="3 3" />
                             <ReferenceLine y={-confidenceInterval} stroke="#a0aec0" strokeDasharray="3 3" />
                        </BarChart>
                    </ResponsiveContainer>
                 </div>
            </div>
        </div>
    );
};
export default ACFChart;
