
import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';

const BoxPlot = ({ stats, height = 120 }: { stats: any, height?: number }) => {
    if (!stats || typeof stats.min === 'undefined') {
        return <div style={{height: `${height}px`}} className="flex items-center justify-center text-gray-500">Generate a sample to see the box plot.</div>;
    }
    const { min, q1, median, q3, max } = stats;
    const range = max - min;

    if (range === 0) {
        return (
            <div className="w-full p-4">
                <h4 className="font-bold text-lg text-white mb-4 text-center">Data Spread (Box Plot)</h4>
                <svg width="100%" height={height} className="overflow-visible">
                     <line x1="50%" y1={height / 2} x2="50%" y2={height / 2} stroke="white" strokeWidth="3" />
                     <text x="50%" y={height} textAnchor="middle" fill="white" fontSize="14">{min.toFixed(1)}</text>
                </svg>
            </div>
        );
    }

    const valueToPercent = (value: number) => {
        return ((value - min) / range) * 100;
    };

    const q1Percent = valueToPercent(q1);
    const medianPercent = valueToPercent(median);
    const q3Percent = valueToPercent(q3);

    return (
        <div className="w-full p-4">
            <h4 className="font-bold text-lg text-white mb-4 text-center">Data Spread (Box Plot)</h4>
            <svg width="100%" height={height} className="overflow-visible">
                {/* Axis Line */}
                <line x1="0%" y1={height / 2} x2="100%" y2={height / 2} stroke="#6b7280" strokeWidth="1" />
                
                {/* Whisker Line */}
                <line x1="0%" y1={height / 2} x2="100%" y2={height / 2} stroke="#a0aec0" strokeWidth="2" />

                {/* Box (IQR) */}
                <rect x={`${q1Percent}%`} y={height * 0.2} width={`${q3Percent - q1Percent}%`} height={height * 0.6} fill="#22d3ee" fillOpacity={0.3} stroke="#22d3ee" strokeWidth="2" />
                
                {/* Median Line */}
                <line x1={`${medianPercent}%`} y1={height * 0.2} x2={`${medianPercent}%`} y2={height * 0.8} stroke="white" strokeWidth="3" />
                
                {/* Min/Max Caps */}
                <line x1="0%" y1={height * 0.3} x2="0%" y2={height * 0.7} stroke="#a0aec0" strokeWidth="2" />
                <line x1="100%" y1={height * 0.3} x2="100%" y2={height * 0.7} stroke="#a0aec0" strokeWidth="2" />

                {/* Labels above the line */}
                <text x={`${q1Percent}%`} y="15" textAnchor="middle" fill="#a0aec0" fontSize="14">Q1: {q1.toFixed(1)}</text>
                <text x={`${medianPercent}%`} y="15" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Median</text>
                <text x={`${q3Percent}%`} y="15" textAnchor="middle" fill="#a0aec0" fontSize="14">Q3: {q3.toFixed(1)}</text>
                
                {/* Labels below the line */}
                <text x="0%" y={height} textAnchor="middle" fill="#a0aec0" fontSize="14">{min.toFixed(1)}</text>
                <text x={`${medianPercent}%`} y={height} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{median.toFixed(1)}</text>
                <text x="100%" y={height} textAnchor="middle" fill="#a0aec0" fontSize="14">{max.toFixed(1)}</text>
            </svg>
        </div>
    );
};


const RobustMeasuresChart: React.FC = () => {
    const BASE_SAMPLE_SIZE = 99;
    const [baseSample, setBaseSample] = useState<number[]>([]);
    const [outlier, setOutlier] = useState<number>(15);

    const generateBaseSample = () => {
        // Generate a sample from a standard normal distribution
        const sample = [];
        for (let i = 0; i < BASE_SAMPLE_SIZE; i++) {
            let u1, u2;
            do { u1 = Math.random(); } while (u1 === 0);
            do { u2 = Math.random(); } while (u2 === 0);
            const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            sample.push(z0 * 2 + 5); // mu=5, sigma=2
        }
        setBaseSample(sample);
    };
    
    useEffect(generateBaseSample, []);

    const fullSample = useMemo(() => [...baseSample, outlier].sort((a,b) => a-b), [baseSample, outlier]);
    
    const stats = useMemo(() => {
        const n = fullSample.length;
        if (n === 0) return {};
        
        const min = fullSample[0];
        const max = fullSample[n - 1];
        
        // Mean
        const mean = fullSample.reduce((a, b) => a + b, 0) / n;
        
        // Std Dev
        const stdDev = Math.sqrt(fullSample.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1));
        
        // Median (Q2)
        const mid = Math.floor(n / 2);
        const median = n % 2 !== 0 ? fullSample[mid] : (fullSample[mid - 1] + fullSample[mid]) / 2;
        
        // Quartiles & IQR
        const q1Index = Math.floor(n * 0.25);
        const q3Index = Math.floor(n * 0.75);
        const q1 = n % 4 !== 0 ? fullSample[q1Index] : (fullSample[q1Index - 1] + fullSample[q1Index]) / 2;
        const q3 = n % 4 !== 0 ? fullSample[q3Index] : (fullSample[q3Index - 1] + fullSample[q3Index]) / 2;
        const iqr = q3 - q1;

        // Trimean
        const trimean = (q1 + 2 * median + q3) / 4;

        // Yule-Kendall Index
        const yuleKendall = iqr > 0 ? (q1 - 2 * median + q3) / iqr : 0;

        return { min, max, mean, stdDev, median, q1, q3, iqr, trimean, yuleKendall };
    }, [fullSample]);

    const histogramData = useMemo(() => {
        if (fullSample.length === 0) return [];
        const min = Math.min(...fullSample);
        const max = Math.max(...fullSample);
        const bins = 20;
        const binWidth = (max - min) / bins;

        if (binWidth <= 0) { // Handle case where all values are the same
             return [{ x: min, count: fullSample.length }];
        }

        const hist = Array(bins).fill(0).map((_, i) => ({
            x: min + i * binWidth,
            count: 0
        }));

        for (const val of fullSample) {
            let binIndex = Math.floor((val - min) / binWidth);
            // Ensure last bin includes max value
            if (binIndex === bins) binIndex = bins -1;
            if(hist[binIndex]) hist[binIndex].count++;
        }
        return hist;
    }, [fullSample]);

    const StatDisplay: React.FC<{name: string, value: number | undefined}> = ({name, value}) => (
        <div className="flex justify-between items-baseline bg-gray-900/50 p-2 rounded">
            <span className="text-sm text-gray-400">{name}</span>
            <span className="font-mono text-lg text-white">{value?.toFixed(2) ?? 'N/A'}</span>
        </div>
    );

    // FIX: Ensure tooltipFormatter returns a valid ReactNode to fix TypeScript error.
    const tooltipFormatter = (value: unknown) => {
      if (typeof value === 'number') {
        return value.toFixed(0);
      }
      if (typeof value === 'string') {
        return value;
      }
      return null;
    };
    
    const labelFormatter = (label: number) => `Value Range: ~${label.toFixed(2)}`;
    
    return (
        <div className="w-full">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                 <div className="bg-gray-800/50 p-4 rounded-lg">
                    <label className="flex justify-between items-center text-gray-300 mb-2">
                        <span>Outlier Value</span>
                        <span className="font-mono bg-gray-700 px-2 py-1 rounded text-pink-400">{outlier.toFixed(1)}</span>
                    </label>
                    <input type="range" min="-10" max="30" step="0.1" value={outlier} onChange={e => setOutlier(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500" />
                     <div className="text-center mt-2">
                         <button onClick={generateBaseSample} className="bg-gray-700 hover:bg-cyan-500 text-white font-bold py-1 px-3 rounded-lg transition-colors text-sm">Generate New Base Sample</button>
                     </div>
                </div>
                 <div className="bg-gray-800/50 p-4 rounded-lg grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                         <p className="font-bold text-cyan-400">Non-Robust</p>
                         <StatDisplay name="Mean" value={stats.mean} />
                         <StatDisplay name="Std. Dev." value={stats.stdDev} />
                    </div>
                     <div className="space-y-2">
                         <p className="font-bold text-pink-400">Robust</p>
                         <StatDisplay name="Median" value={stats.median} />
                         <StatDisplay name="IQR" value={stats.iqr} />
                         <StatDisplay name="Trimean" value={stats.trimean} />
                         <StatDisplay name="Yule-Kendall" value={stats.yuleKendall} />
                    </div>
                 </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg mb-4">
                <BoxPlot stats={stats} />
            </div>

            <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                 <ResponsiveContainer>
                    <BarChart data={histogramData} barGap={0} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                        <XAxis dataKey="x" tickFormatter={(v) => v.toFixed(1)}>
                            <Label value="Value" offset={-15} position="insideBottom" fill="#a0aec0" />
                        </XAxis>
                        <YAxis allowDecimals={false}>
                            <Label value="Count" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-20} />
                        </YAxis>
                        <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', color: '#E0E0E0' }} cursor={{fill: 'rgba(100, 116, 139, 0.1)'}} formatter={tooltipFormatter} labelFormatter={labelFormatter}/>
                        <Bar dataKey="count" name="Count" fill="#a0aec0" />
                        <ReferenceLine x={stats.mean} stroke="#22d3ee" strokeWidth={2}><Label value="Mean" fill="#22d3ee" position="top" /></ReferenceLine>
                        <ReferenceLine x={stats.median} stroke="#f472b6" strokeWidth={2}><Label value="Median" fill="#f472b6" position="top" /></ReferenceLine>
                    </BarChart>
                 </ResponsiveContainer>
            </div>
        </div>
    );
};
export default RobustMeasuresChart;