
import React, { useState, useMemo, useEffect, useCallback } from 'react';

const MannWhitneyChart: React.FC = () => {
    const [sample1, setSample1] = useState<number[]>([]);
    const [sample2, setSample2] = useState<number[]>([]);
    const [outlier, setOutlier] = useState(15);

    const generateSamples = useCallback(() => {
        const s1 = Array.from({length: 20}, () => Math.random() * 10); // Uniform(0, 10)
        const s2 = Array.from({length: 20}, () => Math.random() * 10 + 1); // Uniform(1, 11)
        setSample1(s1);
        setSample2(s2);
    }, []);

    useEffect(generateSamples, [generateSamples]);

    const { uStat, tStat, zApprox } = useMemo(() => {
        const s2WithOutlier = [...sample2, outlier];
        const n1 = sample1.length;
        const n2 = s2WithOutlier.length;

        if (n1 === 0 || n2 === 0) return {};
        
        // Mann-Whitney U
        const combined = [
            ...sample1.map(v => ({ value: v, group: 1 })),
            ...s2WithOutlier.map(v => ({ value: v, group: 2 }))
        ].sort((a, b) => a.value - b.value);

        const ranks = combined.map((d, i) => ({ ...d, rank: i + 1 }));
        
        const R1 = ranks.filter(r => r.group === 1).reduce((sum, r) => sum + r.rank, 0);
        const U1 = R1 - (n1 * (n1 + 1)) / 2;
        const U2 = n1 * n2 - U1;
        const uStat = Math.min(U1, U2);
        
        // Z-approximation for p-value
        const meanU = (n1 * n2) / 2;
        const stdU = Math.sqrt((n1 * n2 * (n1 + n2 + 1)) / 12);
        const zApprox = (uStat - meanU) / stdU;

        // For comparison: t-test
        const mean1 = sample1.reduce((a, b) => a + b, 0) / n1;
        const mean2 = s2WithOutlier.reduce((a, b) => a + b, 0) / n2;
        const var1 = sample1.reduce((a, b) => a + (b - mean1)**2, 0) / (n1 - 1);
        const var2 = s2WithOutlier.reduce((a, b) => a + (b - mean2)**2, 0) / (n2 - 1);
        const pooledVar = ((n1 - 1) * var1 + (n2 - 1) * var2) / (n1 + n2 - 2);
        const tStat = (mean1 - mean2) / Math.sqrt(pooledVar * (1/n1 + 1/n2));

        return { uStat, tStat, zApprox };
    }, [sample1, sample2, outlier]);

    const criticalZ = -1.96; // For two-tailed alpha=0.05

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                 <div className="bg-gray-800/50 p-4 rounded-lg">
                    <label className="flex justify-between items-center text-gray-300 mb-2">
                        <span>Outlier Value (added to Group 2)</span>
                        <span className="font-mono bg-gray-700 px-2 py-1 rounded text-pink-400">{outlier.toFixed(1)}</span>
                    </label>
                    <input type="range" min="-10" max="50" step="0.1" value={outlier} onChange={e => setOutlier(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500" />
                     <div className="text-center mt-2">
                         <button onClick={generateSamples} className="bg-gray-700 hover:bg-cyan-500 text-white font-bold py-1 px-3 rounded-lg transition-colors text-sm">Generate New Base Samples</button>
                     </div>
                </div>
                 <div className="bg-gray-800/50 p-4 rounded-lg grid grid-cols-2 gap-4 text-center">
                     <div>
                         <h4 className="font-bold text-pink-400">Mann-Whitney U Test</h4>
                         <p className="text-sm text-gray-400">Z-statistic</p>
                         <p className="font-mono text-xl">{zApprox?.toFixed(3)}</p>
                         <p className={`font-bold text-lg ${zApprox < criticalZ ? 'text-pink-400' : 'text-green-400'}`}>{zApprox < criticalZ ? 'Reject H₀' : 'Fail to Reject H₀'}</p>
                     </div>
                     <div>
                         <h4 className="font-bold text-cyan-400">t-Test (for comparison)</h4>
                         <p className="text-sm text-gray-400">t-statistic</p>
                         <p className="font-mono text-xl">{tStat?.toFixed(3)}</p>
                         <p className={`font-bold text-lg ${tStat < criticalZ ? 'text-pink-400' : 'text-green-400'}`}>{tStat < criticalZ ? 'Reject H₀' : 'Fail to Reject H₀'}</p>
                     </div>
                 </div>
            </div>
            <p className="text-center text-gray-400 text-sm">
                Note how the t-test result is heavily influenced by the outlier, while the Mann-Whitney U test result remains more stable. This demonstrates the robustness of non-parametric tests.
            </p>
        </div>
    );
};

export default MannWhitneyChart;
