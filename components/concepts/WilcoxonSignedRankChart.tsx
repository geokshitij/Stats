
import React, { useState, useMemo, useEffect, useCallback } from 'react';

const WilcoxonSignedRankChart: React.FC = () => {
    const [sample, setSample] = useState<{before: number, after: number}[]>([]);
    const [effectSize, setEffectSize] = useState(0.8);

    const generateSample = useCallback(() => {
        const newSample = [];
        for (let i = 0; i < 15; i++) {
            const before = Math.random() * 10;
            const after = before + (Math.random() - 0.2) * 2 + effectSize; // Add noise and effect
            newSample.push({ before, after });
        }
        setSample(newSample);
    }, [effectSize]);

    useEffect(generateSample, [generateSample]);

    const { tableData, W, N } = useMemo(() => {
        // FIX: Explicitly type the 'differences' array to include an optional 'rank' property.
        const differences: {
            before: number;
            after: number;
            diff: number;
            absDiff: number;
            rank?: number;
        }[] = sample.map(d => ({ ...d, diff: d.after - d.before }))
                                .filter(d => d.diff !== 0)
                                .map(d => ({...d, absDiff: Math.abs(d.diff)}));
        
        differences.sort((a,b) => a.absDiff - b.absDiff);

        // Assign ranks, handling ties by averaging
        let i = 0;
        while (i < differences.length) {
            let j = i;
            while (j < differences.length - 1 && differences[j].absDiff === differences[j + 1].absDiff) {
                j++;
            }
            const rankSum = Array.from({length: j - i + 1}, (_, k) => i + 1 + k).reduce((a,b) => a+b, 0);
            const avgRank = rankSum / (j - i + 1);
            for (let k = i; k <= j; k++) {
                // FIX: This assignment is now valid because 'rank' is part of the type.
                differences[k].rank = avgRank;
            }
            i = j + 1;
        }

        // FIX: Use non-null assertion (!) because the logic guarantees 'rank' is assigned.
        const rankSumPositive = differences.filter(d => d.diff > 0).reduce((sum, d) => sum + d.rank!, 0);
        const rankSumNegative = differences.filter(d => d.diff < 0).reduce((sum, d) => sum + d.rank!, 0);

        const W = Math.min(rankSumPositive, rankSumNegative);
        const N = differences.length;

        return { tableData: differences, W, N };
    }, [sample]);
    
    // Critical values for N=15, alpha=0.05 two-tailed is 25
    const criticalValue = 25;

    return (
         <div className="w-full">
            <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                <label className="flex justify-between items-center text-gray-300 mb-2">
                    <span>"After" Effect Size</span>
                    <span className="font-mono bg-gray-700 px-2 py-1 rounded text-cyan-400">{effectSize.toFixed(2)}</span>
                </label>
                <input type="range" min="-2" max="3" step="0.1" value={effectSize} onChange={e => setEffectSize(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                <div className="text-center mt-2">
                    <button onClick={generateSample} className="bg-gray-700 hover:bg-cyan-500 text-white font-bold py-1 px-3 rounded-lg transition-colors text-sm">Generate New Paired Sample (n=15)</button>
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">W-statistic</h4><p className="font-mono text-white text-2xl">{W.toFixed(1)}</p></div>
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Critical Value (N={N})</h4><p className="font-mono text-red-400 text-2xl">{criticalValue}</p></div>
                <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Result (α=0.05)</h4><p className={`font-bold text-2xl ${W <= criticalValue ? 'text-pink-400' : 'text-green-400'}`}>{W <= criticalValue ? 'Reject H₀' : 'Fail to Reject H₀'}</p></div>
            </div>
            <div className="w-full max-h-80 overflow-y-auto bg-gray-800 p-4 rounded-lg shadow-inner">
                <table className="w-full text-center text-sm">
                    <thead>
                        <tr className="border-b border-gray-600">
                            <th className="p-2">Subject</th><th>Before</th><th>After</th><th>Difference</th><th>Abs(Diff)</th><th>Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((d, i) => (
                            <tr key={i} className={`border-b border-gray-700/50 ${d.diff > 0 ? 'text-green-300' : 'text-red-300'}`}>
                                <td className="p-1 text-gray-400">{i+1}</td>
                                <td>{d.before.toFixed(2)}</td>
                                <td>{d.after.toFixed(2)}</td>
                                <td>{d.diff.toFixed(2)}</td>
                                <td>{d.absDiff.toFixed(2)}</td>
                                {/* FIX: Accessing 'd.rank' is now valid because it exists on the type. */}
                                <td>{d.rank}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WilcoxonSignedRankChart;