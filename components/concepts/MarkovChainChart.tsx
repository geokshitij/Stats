import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, ReferenceLine } from 'recharts';

const MarkovChainChart: React.FC = () => {
    const [params, setParams] = useState({ p00: 0.7, p11: 0.2 });
    const [simulation, setSimulation] = useState<{ path: number[]; probState1: { time: number, prob: number }[] }>({ path: [], probState1: [] });

    const runSimulation = useCallback(() => {
        const { p00, p11 } = params;
        const p01 = 1 - p00;
        const p10 = 1 - p11;
        const steps = 100;

        const newPath = [0]; // Start in State 0
        for (let i = 0; i < steps - 1; i++) {
            const currentState = newPath[i];
            const rand = Math.random();
            if (currentState === 0) {
                newPath.push(rand < p00 ? 0 : 1);
            } else {
                newPath.push(rand < p11 ? 1 : 0);
            }
        }

        // Calculate theoretical probability evolution
        const probEvolution = [];
        let probVector = [1.0, 0.0]; // Start in State 0
        for (let t = 0; t < steps; t++) {
            probEvolution.push({ time: t, prob: probVector[1] });
            const p0_next = probVector[0] * p00 + probVector[1] * p10;
            const p1_next = probVector[0] * p01 + probVector[1] * p11;
            probVector = [p0_next, p1_next];
        }

        setSimulation({ path: newPath, probState1: probEvolution });
    }, [params]);
    
    useEffect(() => {
        runSimulation();
    }, [runSimulation]);
    
    const handleParamChange = (field: keyof typeof params, value: number) => {
        setParams(p => ({ ...p, [field]: value }));
    };

    const steadyStateProb = useMemo(() => {
        const p01 = 1 - params.p00;
        const p10 = 1 - params.p11;
        if (p01 + p10 === 0) return NaN;
        // This is the probability of being in state 1
        return p10 / (p01 + p10);
    }, [params]);

    const ParamSlider = ({ name, field, min, max, step }: { name: string, field: keyof typeof params, min: number, max: number, step: number }) => (
        <div>
            <label className="flex justify-between items-center text-gray-300 mb-2">
                <span>{name}</span>
                <span className="font-mono bg-gray-700 px-2 py-1 rounded text-cyan-400">{params[field].toFixed(2)}</span>
            </label>
            <input type="range" min={min} max={max} step={step} value={params[field]}
                   onChange={e => handleParamChange(field, parseFloat(e.target.value))}
                   className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
        </div>
    );
    
    return (
        <div className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-gray-800/50 p-6 rounded-lg">
                <ParamSlider name="p₀₀ (No Rain → No Rain)" field="p00" min={0.01} max={0.99} step={0.01} />
                <ParamSlider name="p₁₁ (Rain → Rain)" field="p11" min={0.01} max={0.99} step={0.01} />
                <div className="md:col-span-2 text-center">
                     <button onClick={runSimulation} className="bg-gray-700 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        Run New Simulation
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2 text-center text-cyan-400">Transition Matrix (P)</h4>
                    <div className="flex justify-center items-center">
                        <div className="text-lg font-mono p-4 rounded-lg bg-gray-900/50">
                            <div className="flex space-x-4"><span>[</span><div><div>{(params.p00).toFixed(2)}, {(1 - params.p00).toFixed(2)}</div><div>{(1 - params.p11).toFixed(2)}, {(params.p11).toFixed(2)}</div></div><span>]</span></div>
                        </div>
                    </div>
                </div>
                 <div className="bg-gray-800 p-4 rounded-lg text-center flex flex-col justify-center">
                    <h4 className="font-semibold text-gray-400">Steady-State Probability of Rain</h4>
                    <p className="font-mono text-white text-3xl mt-2">{steadyStateProb.toFixed(3)}</p>
                 </div>
            </div>

            <div>
                <h4 className="font-bold text-lg text-center text-cyan-400 mb-2">Simulated Path (100 steps, starting with no rain)</h4>
                <div className="w-full h-auto bg-gray-800 p-2 rounded-lg shadow-inner flex flex-wrap gap-1">
                    {simulation.path.slice(0, 195).map((state, i) => (
                        <div key={i} className={`w-4 h-4 rounded-sm ${state === 0 ? 'bg-yellow-400' : 'bg-blue-500'}`} title={`Step ${i+1}: ${state === 0 ? 'No Rain' : 'Rain'}`}></div>
                    ))}
                </div>
            </div>

             <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                 <h4 className="text-center font-semibold text-gray-400 mb-2">Convergence to Steady-State</h4>
                 <ResponsiveContainer>
                    <LineChart data={simulation.probState1} margin={{ top: 5, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                        <XAxis type="number" dataKey="time">
                            <Label value="Time Step" offset={-15} position="insideBottom" fill="#a0aec0" />
                        </XAxis>
                        <YAxis domain={[0, 1]}>
                            <Label value="P(State = Rain)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-10} />
                        </YAxis>
                        <Tooltip contentStyle={{ backgroundColor: '#1E1E1E' }} formatter={(v: number) => v.toFixed(3)} labelFormatter={(label: number) => `Time: ${label}`} />
                        <Line type="monotone" dataKey="prob" name="P(Rain)" stroke="#22d3ee" dot={false} strokeWidth={2} />
                        {!isNaN(steadyStateProb) && <ReferenceLine y={steadyStateProb} stroke="#f472b6" strokeDasharray="5 5" label={{ value: 'Steady-State', fill: '#f472b6', position: 'insideTopLeft' }} />}
                    </LineChart>
                 </ResponsiveContainer>
             </div>
        </div>
    );
};

export default MarkovChainChart;
