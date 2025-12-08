import React, { useState, useMemo } from 'react';
import { ComposedChart, CartesianGrid, XAxis, Label, YAxis, Tooltip, Area, ReferenceLine, ResponsiveContainer } from 'recharts';
import { MathUtils } from '../../utils/math';

const ChiSquareChart: React.FC = () => {
    const presets = {
        'social': [[35, 10, 55], [25, 40, 15]], // Social media vs. Age group
        'none': [[30, 30, 30], [30, 30, 30]], // No association
    };
    const [observed, setObserved] = useState<number[][]>(presets.social);

    const { expected, chi2, df, criticalValue, colTotals, rowTotals, grandTotal } = useMemo(() => {
        const numRows = observed.length;
        const numCols = observed[0].length;

        const rowTotals = observed.map(row => row.reduce((sum, val) => sum + val, 0));
        const colTotals = Array(numCols).fill(0).map((_, i) => observed.reduce((sum, row) => sum + row[i], 0));
        const grandTotal = rowTotals.reduce((sum, val) => sum + val, 0);

        const expected = observed.map((row, r) => row.map((_, c) => (rowTotals[r] * colTotals[c]) / grandTotal));

        const chi2 = expected.reduce((sum, row, r) => sum + row.reduce((rowSum, expVal, c) => rowSum + ((observed[r][c] - expVal) ** 2) / expVal, 0), 0);
        
        const df = (numRows - 1) * (numCols - 1);
        
        // Wilson-Hilferty approximation for critical value
        const z = MathUtils.normalQuantile(1 - 0.05);
        const term = 1 - 2/(9*df) + z * Math.sqrt(2/(9*df));
        const criticalValue = df * (term ** 3);

        return { expected, chi2, df, criticalValue, colTotals, rowTotals, grandTotal };
    }, [observed]);

     const chi2DistData = useMemo(() => {
        if (df <= 0) return [];
        const data = [];
        const pdf = (x: number) => {
            if (x <= 0) return 0;
            const num = Math.pow(x, df/2 - 1) * Math.exp(-x/2);
            const den = Math.pow(2, df/2) * MathUtils.gamma(df/2);
            return num/den;
        };
        const maxX = Math.max(10, criticalValue * 2, chi2 * 1.2);
        for(let x = 0.1; x <= maxX; x += maxX/100) {
            const d = pdf(x);
            data.push({
                x, 
                density: d,
                rejectionArea: (x >= criticalValue) ? d : null
            });
        }
        return data;
    }, [df, criticalValue, chi2]);
    
    const handleObservedChange = (r: number, c: number, value: string) => {
        const newObserved = observed.map(row => [...row]);
        newObserved[r][c] = parseInt(value, 10) || 0;
        setObserved(newObserved);
    };
    
    const tooltipFormatter = (value: unknown) => {
      if (typeof value === 'number') {
        return value.toFixed(4);
      }
      if (typeof value === 'string') {
        return value;
      }
      return null;
    };
    
    const labelFormatter = (label: number) => `χ²: ${label.toFixed(3)}`;

    const categories = ["TikTok", "Facebook", "X"];
    const groups = ["Gen Z", "Millennial"];

    return (
         <div className="w-full">
            <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                <p className="text-gray-300 mb-2">Scenario: Preferred Social Media by Age Group</p>
                <div className="flex space-x-2">
                    <button onClick={() => setObserved(presets.social)} className="bg-gray-700 hover:bg-cyan-500 text-white py-1 px-3 rounded-lg text-sm">Load 'Association'</button>
                    <button onClick={() => setObserved(presets.none)} className="bg-gray-700 hover:bg-cyan-500 text-white py-1 px-3 rounded-lg text-sm">Load 'No Association'</button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
                {([['Observed Counts', observed, 'text-cyan-400'], ['Expected Counts (if no association)', expected, 'text-pink-400']] as const).map(([title, data, textColor]) => (
                <div key={title} className="bg-gray-800 p-4 rounded-lg">
                    <h4 className={`font-bold text-lg mb-2 ${textColor}`}>{title}</h4>
                    <table className="w-full text-center">
                        <thead><tr><th></th>{categories.map(c => <th key={c} className="font-normal text-gray-400">{c}</th>)}<th className="font-semibold">Total</th></tr></thead>
                        <tbody>
                            {groups.map((group, r) => (
                                <tr key={group}>
                                    <th className="font-normal text-gray-400 text-left">{group}</th>
                                    {categories.map((_, c) => (
                                        <td key={c}>{title === 'Observed Counts' ? <input type="number" value={data[r][c]} onChange={e => handleObservedChange(r,c, e.target.value)} className="w-16 bg-gray-700 text-center rounded-md" /> : data[r][c].toFixed(1) }</td>
                                    ))}
                                    <td className="font-semibold">{rowTotals[r]}</td>
                                </tr>
                            ))}
                        </tbody>
                         <tfoot>
                            <tr className="border-t border-gray-600">
                                <th className="font-semibold">Total</th>
                                {colTotals.map((t, i) => <td key={i} className="font-semibold">{t}</td>)}
                                <td className="font-bold text-white">{grandTotal}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                ))}
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mb-4">
                 <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">χ² statistic</h4><p className="font-mono text-white text-2xl">{chi2.toFixed(2)}</p></div>
                 <div className="bg-gray-800 p-3 rounded-lg"><h4 className="font-semibold text-gray-400">Critical Value (α=0.05)</h4><p className="font-mono text-red-400 text-2xl">{criticalValue.toFixed(2)}</p></div>
            </div>

            <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
                <p className="text-sm text-gray-400 text-center -mt-2 mb-2">Null distribution for χ²-statistic with {df} degrees of freedom.</p>
                <ResponsiveContainer>
                    <ComposedChart data={chi2DistData} margin={{ top: 25, right: 30, bottom: 20, left: 20 }}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                        <XAxis type="number" dataKey="x" domain={['dataMin', 'dataMax']} tickFormatter={(tick) => tick.toFixed(1)}>
                            <Label value="χ²-statistic" offset={-15} position="insideBottom" fill="#a0aec0" />
                        </XAxis>
                        <YAxis>
                             <Label value="Density" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-20} />
                        </YAxis>
                        <Tooltip contentStyle={{ backgroundColor: '#1E1E1E', color: '#E0E0E0' }} formatter={tooltipFormatter} labelFormatter={labelFormatter} />
                        <Area type="monotone" dataKey="density" stroke="#a0aec0" fill="#a0aec0" fillOpacity={0.2} name="χ²-distribution" />
                        <Area type="monotone" dataKey="rejectionArea" stroke="none" fill="#e11d48" fillOpacity={0.7} name="Rejection Region (α=0.05)" />
                        <ReferenceLine x={chi2} stroke="#22d3ee" strokeWidth={3}>
                            <Label value="Observed χ²" position="top" fill="#22d3ee" />
                        </ReferenceLine>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ChiSquareChart;