
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label
} from 'recharts';

type DistributionChartProps = {
  graphData: { [key: string]: number | string }[];
  graphType: 'bar' | 'line';
  xAxisKey: string;
  yAxisKey: string;
  xAxisLabel: string;
  yAxisLabel: string;
};

const DistributionChart: React.FC<DistributionChartProps> = ({ 
  graphData, 
  graphType, 
  xAxisKey, 
  yAxisKey, 
  xAxisLabel, 
  yAxisLabel 
}) => {
  const ChartComponent = graphType === 'bar' ? BarChart : LineChart;
  const ChartSeries = graphType === 'bar' ? Bar : Line;

  const tickFormatter = (value: any) => {
    if (typeof value === 'number' && value % 1 !== 0) {
      // For small probabilities/densities, keep more precision
      if (Math.abs(value) < 1) {
        return value.toFixed(3);
      }
      return value.toFixed(2);
    }
    return value;
  };

  const labelFormatter = (label: any) => {
      const labelName = xAxisLabel.split('(')[0].trim();
      return `${labelName}: ${tickFormatter(label)}`;
  };

  return (
    <div className="w-full h-80 bg-gray-800 p-4 rounded-lg shadow-inner">
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent
          data={graphData}
          margin={{ top: 5, right: 20, left: 30, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
          <XAxis dataKey={xAxisKey} stroke="#a0aec0" interval="preserveStartEnd" tickFormatter={tickFormatter}>
             <Label value={xAxisLabel} offset={-15} position="insideBottom" fill="#a0aec0" />
          </XAxis>
          <YAxis stroke="#a0aec0" domain={[0, 'dataMax']} allowDataOverflow={true} tickFormatter={tickFormatter}>
            <Label value={yAxisLabel} angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#a0aec0' }} dx={-20} />
          </YAxis>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E1E1E',
              borderColor: '#424242',
              color: '#E0E0E0'
            }}
            cursor={{ fill: 'rgba(100, 116, 139, 0.2)' }}
            labelFormatter={labelFormatter}
          />
          <ChartSeries
            type="monotone"
            name={yAxisLabel}
            dataKey={yAxisKey}
            fill="#22d3ee"
            stroke="#22d3ee"
            dot={graphType === 'line' ? { r: 2 } : false}
            activeDot={graphType === 'line' ? { r: 6 } : undefined}
          />
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

export default DistributionChart;