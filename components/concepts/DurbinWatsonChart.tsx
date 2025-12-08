
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { MathUtils } from '../../utils/math';

// Durbin-Watson critical values table for alpha = 0.05
const DW_TABLE_5_PERCENT: { [key: string]: { [key: number]: { dl: number, du: number } } } = {
  k1: { 20: {dl: 1.20, du: 1.41}, 30: {dl: 1.35, du: 1.49}, 50: {dl: 1.50, du: 1.59}, 100: {dl: 1.65, du: 1.69} },
  k3: { 20: {dl: 1.00, du: 1.68}, 30: {dl: 1.21, du: 1.65}, 50: {dl: 1.42, du: 1.67}, 100: {dl: 1.61, du: 1.72} },
  k5: { 20: {dl: 0.82, du: 1.99}, 30: {dl: 1.07, du: 1.83}, 50: {dl: 1.34, du: 1.77}, 100: {dl: 1.57, du: 1.78} }
};

const getDWValues = (n: number, k: number): { dl: number, du: number } => {
    const kStr = `k${k}`;
    const table = DW_TABLE_5_PERCENT[kStr];
    if (!table) return { dl: NaN, du: NaN };

    const sizes = Object.keys(table).map(Number).sort((a,b) => a-b);
    if (n <= sizes[0]) return table[sizes[0]];
    if (n >= sizes[sizes.length - 1]) return table[sizes[sizes.length - 1]];
    
    let lowerN = sizes[0], upperN = sizes[sizes.length-1];
    for (let i = 0; i < sizes.length -1; i++) {
        if (n >= sizes[i] && n <= sizes[i+1]) {
            lowerN = sizes[i];
            upperN = sizes[i+1];
            break;
        }
    }
    
    const lowerVals = table[lowerN];
    const upperVals = table[upperN];
    const frac = (n - lowerN) / (upperN - lowerN);

    const dl = lowerVals.dl + frac * (upperVals.dl - lowerVals.dl);
    const du = lowerVals.du + frac * (upperVals.du - lowerVals.du);
    
    return {dl, du};
};


const DWScale: React.FC<{ dStat: number, dl: number, du: number }> = ({ dStat, dl, du }) => {
    const pos = (dStat / 4) * 100;
    const dlPos = (dl / 4) * 100;
    const duPos = (du / 4) * 100;
    const fourMinusDuPos = ((4 - du) / 4) * 100;
    const fourMinusDlPos = ((4 - dl) / 4) * 100;

    return (
        <div className="w-full bg-gray-900/50 p-6 rounded-lg">
            <div className="relative h-8 w-full">
                {/* Background scale */}
                <div className="absolute top-0 left-0 w-full h-full flex rounded-md overflow-hidden">
                    <div className="bg-pink-500/70" style={{ width: `${dlPos}%` }}></div>
                    <div className="bg-yellow-500/70" style={{ width: `${duPos - dlPos}%` }}></div>
                    <div className="bg-green-500/70" style={{ width: `${fourMinusDuPos - duPos}%` }}></div>
                    <div className="bg-yellow-500/70" style={{ width: `${fourMinusDlPos - fourMinusDuPos}%` }}></div>
                    <div className="bg-pink-500/70" style={{ width: `${100 - fourMinusDlPos}%` }}></div>
                </div>
                {/* Indicator needle */}
                {!isNaN(dStat) && (
                    <div className="absolute top-[-10px] transition-all duration-300" style={{ left: `calc(${pos}% - 2px)` }}>
                        <div className="w-1 h-12 bg-cyan-400 rounded-full"></div>
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-gray-700 text-cyan-400 text-xs font-bold rounded shadow-lg whitespace-nowrap">d = {dStat.toFixed(2)}</div>
                    </div>
                )}
                {/* Labels */}
                <div className="absolute top-full left-0 w-full flex justify-between text-xs text-gray-400 mt-2">
                    <span>0</span><span>{dl.toFixed(2)}</span><span>{du.toFixed(2)}</span>
                    <span>2</span>
                    <span>{(4 - du).toFixed(2)}</span><span>{(4 - dl).toFixed(2)}</span><span>4</span>
                </div>
                 <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-center text-xs text-white/50 font-semibold tracking-widest">
                    <div className="text-center" style={{ width: `${dlPos}%` }}>+VE CORR</div>
                    <div className="text-center" style={{ width: `${duPos - dlPos}%` }}>INCONC.</div>
                    <div className="text-center" style={{ width: `${fourMinusDuPos - duPos}%` }}>NO CORR</div>
                    <div className="text-center" style={{ width: `${fourMinusDlPos - fourMinusDuPos}%` }}>INCONC.</div>
                    <div className="text-center" style={{ width: `${100 - fourMinusDlPos}%` }}>-VE CORR</div>
                </div>
            </div>
        </div>
    );
};


const DurbinWatsonChart: React.FC = () => {
    const [params, setParams] = useState({
        sampleSize: 50,
        autocorrelation: 0.8,
        numPredictors: 1,
    });
    const [simulation, setSimulation] = useState<{ residuals: { time: number, value: number }[], dStat: number }>({ residuals: [], dStat: NaN });

    const runSimulation = useCallback(() => {
        const { sampleSize, autocorrelation } = params;
        const residuals = [];
        let e_prev = 0;
        for (let t = 1; t <= sampleSize; t++) {
            const nu = MathUtils.normalQuantile(Math.random()); // White noise
            const e_t = autocorrelation * e_prev + nu;
            residuals.push({ time: t, value: e_t });
            e_prev = e_t;
        }

        let num = 0;
        let den = 0;
        for (let i = 0; i < residuals.length; i++) {
            den += residuals[i].value ** 2;
            if (i > 0) {
                num += (residuals[i].value - residuals[i - 1].value) ** 2;
            }
        }

        const dStat = den === 0 ? NaN : num / den;
        setSimulation({ residuals, dStat });

    }, [params]);

    useEffect(() => {
        runSimulation();
    }, [runSimulation]);
    
    const { dl, du } = useMemo(() => getDWValues(params.sampleSize, params.numPredictors), [params]);
    
    const conclusion = useMemo(() => {
        const { dStat } = simulation;
        if (isNaN(dStat) || isNaN(dl) || isNaN(du)) return "N/A";

        if (dStat < dl) return "Reject H₀ (Positive Autocorrelation)";
        if (dStat > 4 - dl) return "Reject H₀ (Negative Autocorrelation)";
        if (dStat > du && dStat < 4 - du) return "Fail to Reject H₀ (No Autocorrelation)";
        return "Inconclusive";
    }, [simulation, dl, du]);

    const labelFormatter = (label: number) => `Time: ${label}`;

    return (
        <div className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 bg-gray-800/50 p-6 rounded-lg">
                <div>
                    <label className="flex justify-between items-center text-gray-300 mb-2"><span>Autocorrelation (ρ)</span><span className="font-mono bg-gray-700 px-2 py-1 rounded">{params.autocorrelation.toFixed(2)}</span></label>
                    <input type="range" min={-0.99} max={0.99} step={0.01} value={params.autocorrelation} onChange={e => setParams(p => ({ ...p, autocorrelation: parseFloat(e.target.value) }))} className="w-full h-2 bg-gray-700 rounded-lg accent-cyan-500" />
                </div>
                <div>
                    <label className="flex justify-between items-center text-gray-300 mb-2"><span>Sample Size (n)</span><span className="font-mono bg-gray-700 px-2 py-1 rounded">{params.sampleSize}</span></label>
                    <input type="range" min={20} max={100} step={5} value={params.sampleSize} onChange={e => setParams(p => ({ ...p, sampleSize: parseInt(e.target.value, 10) }))} className="w-full h-2 bg-gray-700 rounded-lg accent-cyan-500" />
                </div>
                <div>
                    <label className="flex justify-between items-center text-gray-300 mb-2"><span>Predictors (K)</span><span className="font-mono bg-gray-700 px-2 py-1 rounded">{params.numPredictors}</span></label>
                    <select value={params.numPredictors} onChange={e => setParams(p => ({...p, numPredictors: parseInt(e.target.value, 10)}))} className="w-full bg-gray-700 text-white rounded p-1">
                        <option value={1}>1</option>
                        <option value={3}>3</option>
                        <option value={5}>5</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                 <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Critical Values (d<sub>L</sub>, d<sub>U</sub>)</h4><p className="font-mono text-red-400 text-2xl">{dl.toFixed(2)}, {du.toFixed(2)}</p></div>
                 <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Conclusion</h4><p className={`font-bold text-2xl ${conclusion.startsWith('Reject') ? 'text-pink-400' : 'text-green-400'}`}>{conclusion}</p></div>
            </div>
            
             <DWScale dStat={simulation.dStat} dl={dl} du={du} />

            <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                 <h4 className="text-center font-semibold text-gray-400 mb-2">Simulated Residuals Over Time</h4>
                <ResponsiveContainer>
                    <LineChart data={simulation.residuals} margin={{ top: 5, right: 20, bottom: 20, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                        <XAxis type="number" dataKey="time" domain={['dataMin', 'dataMax']}>
                            <Label value="Time" offset={-15} position="insideBottom" fill="#a0aec0" />
                        </XAxis>
                        <YAxis tickFormatter={(tick) => typeof tick === 'number' ? tick.toFixed(1) : tick}>
                            <Label value="Residual Value" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={0} />
                        </YAxis>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1E1E1E' }} 
                            formatter={(v) => typeof v === 'number' ? v.toFixed(2) : v} 
                            labelFormatter={labelFormatter}
                        />
                        <Line type="monotone" dataKey="value" stroke="#22d3ee" dot={false} strokeWidth={2} name="Residual" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default DurbinWatsonChart;
