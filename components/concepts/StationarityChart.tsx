
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, ReferenceLine } from 'recharts';

const generateSeries = (type: 'stationary' | 'trend' | 'variance', n=100) => {
    const data = [];
    let value = 5;
    for (let i = 0; i < n; i++) {
        const noise = (Math.random() - 0.5) * 2; // noise between -1 and 1
        switch (type) {
            case 'stationary':
                value = 5 + noise;
                break;
            case 'trend':
                value = 5 + (i * 0.1) + noise;
                break;
            case 'variance':
                const changingNoise = (Math.random() - 0.5) * (2 + i * 0.1);
                value = 5 + changingNoise;
                break;
        }
        data.push({ time: i, value });
    }
    return data;
};

const TimeSeriesChart: React.FC<{data: {time: number, value: number}[], title: string}> = ({data, title}) => {
    const mean = data.reduce((sum, d) => sum + d.value, 0) / data.length;
    return (
        <div className="w-full h-64 bg-gray-900/50 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-cyan-400 mb-2 text-center">{title}</h4>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 20, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
                    <XAxis dataKey="time">
                         <Label value="Time" offset={-15} position="insideBottom" fill="#a0aec0" />
                    </XAxis>
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip contentStyle={{ backgroundColor: '#1E1E1E' }} formatter={(val: number) => val.toFixed(2)} />
                    <Line type="monotone" dataKey="value" stroke="#22d3ee" dot={false} strokeWidth={2} />
                    <ReferenceLine y={mean} stroke="#f472b6" strokeDasharray="3 3">
                        <Label value={`Mean: ${mean.toFixed(2)}`} position="insideTopLeft" fill="#f472b6" />
                    </ReferenceLine>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
};

const StationarityChart: React.FC = () => {
    const stationaryData = useMemo(() => generateSeries('stationary'), []);
    const trendData = useMemo(() => generateSeries('trend'), []);
    const varianceData = useMemo(() => generateSeries('variance'), []);

    return (
        <div className="space-y-6">
            <p className="text-gray-400 text-center">These charts illustrate the core idea of stationarity. A stationary series (left) looks statistically similar at all points in time, with a constant mean and variance. The other charts show common types of non-stationarity.</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <TimeSeriesChart data={stationaryData} title="Stationary Series" />
                <TimeSeriesChart data={trendData} title="Non-Stationary (Trend)" />
                <TimeSeriesChart data={varianceData} title="Non-Stationary (Variance)" />
            </div>
        </div>
    );
};

export default StationarityChart;
