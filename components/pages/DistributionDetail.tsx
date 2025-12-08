

import React, { useState, useMemo, useEffect } from 'react';
import { Distribution } from '../../types';
import DistributionChart from '../DistributionChart';
import Formula from '../ui/Formula';
import CdfEcdfChart from '../interactive/CdfEcdfChart';
import QQPlotChart from '../interactive/QQPlotChart';


type Tab = 'overview' | 'cdf' | 'qq';

const DistributionDetail: React.FC<{ 
    distribution: Distribution,
    allDistributions: Distribution[],
    setActiveView: (view: { type: 'dist' | 'concept'; id: string | null }) => void;
}> = ({ distribution, allDistributions, setActiveView }) => {
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const initialParams = useMemo(() => {
        const params: { [key: string]: number } = {};
        distribution.parameters.forEach(p => {
            params[p.id] = p.defaultValue;
        });
        return params;
    }, [distribution]);

    const [params, setParams] = useState(initialParams);

    useEffect(() => {
        setParams(initialParams);
        setActiveTab('overview');
    }, [distribution, initialParams]);

    const handleParamChange = (id: string, value: number) => {
        setParams(prev => ({ ...prev, [id]: value }));
    };

    const graphData = useMemo(() => {
        const paramValues = distribution.parameters.map(p => params[p.id]);
        return distribution.dataGenerator(...paramValues);
    }, [distribution, params]);

    const renderTabContent = () => {
        switch(activeTab) {
            case 'cdf': return <CdfEcdfChart distribution={distribution} params={params} />;
            case 'qq': return <QQPlotChart distribution={distribution} params={params} />;
            case 'overview':
            default:
                return (
                    <DistributionChart 
                        graphData={graphData}
                        graphType={distribution.graphType}
                        xAxisKey={distribution.xAxisKey}
                        yAxisKey={distribution.yAxisKey}
                        xAxisLabel={distribution.xAxisLabel}
                        yAxisLabel={distribution.yAxisLabel}
                    />
                );
        }
    };
    
    const TabButton: React.FC<{tabId: Tab, children: React.ReactNode}> = ({tabId, children}) => (
        <button onClick={() => setActiveTab(tabId)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tabId ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
            {children}
        </button>
    );
    
    const currentIndex = allDistributions.findIndex(d => d.id === distribution.id);
    const prevDist = currentIndex > 0 ? allDistributions[currentIndex - 1] : null;
    const nextDist = currentIndex < allDistributions.length - 1 ? allDistributions[currentIndex + 1] : null;


    return (
        <div className="max-w-5xl mx-auto">
            <header className="mb-4">
              <h2 className="text-4xl font-extrabold text-white tracking-tight">{distribution.name}</h2>
            </header>

            <nav className="flex justify-between items-center mb-8 text-sm">
                <div>
                    {prevDist && (
                        <button 
                            onClick={() => setActiveView({ type: 'dist', id: prevDist.id })}
                            className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            <span>{prevDist.name}</span>
                        </button>
                    )}
                </div>
                <div>
                    {nextDist && (
                         <button 
                            onClick={() => setActiveView({ type: 'dist', id: nextDist.id })}
                            className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                        >
                             <span>{nextDist.name}</span>
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    )}
                </div>
            </nav>
            
            <section className="mb-8">
                <p className="text-lg text-gray-300 leading-relaxed">{distribution.explanation}</p>
            </section>
            
            <section className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Formula</h3>
                <Formula formula={distribution.formula} />
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Parameters</h3>
              <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg">
                {distribution.parameters.map(param => (
                    <div key={param.id} className="mb-4 last:mb-0">
                        <label htmlFor={param.id} className="flex justify-between items-center text-gray-300 mb-2">
                            <span>{param.name}</span>
                            <span className="font-mono bg-gray-700 px-2 py-1 rounded text-cyan-400">{params[param.id]}</span>
                        </label>
                        <input
                            type="range"
                            id={param.id}
                            min={param.min}
                            max={param.max}
                            step={param.step}
                            value={params[param.id]}
                            onChange={(e) => handleParamChange(param.id, parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        {param.explanation && (
                            <div className="text-sm text-gray-400 mt-3 bg-gray-900/50 p-3 rounded-md space-y-2">
                                {param.explanation.map((part, index) => {
                                    const separatorIndex = part.indexOf(":");
                                    if (separatorIndex > 0 && (part.includes('>') || part.includes('<') || part.includes('='))) {
                                        return (
                                           <p key={index}>
                                             <span className="font-semibold text-cyan-400">{part.substring(0, separatorIndex + 1)}</span>
                                             <span className="ml-1">{part.substring(separatorIndex + 1)}</span>
                                           </p>
                                        )
                                    }
                                    return <p key={index}>{part}</p>
                                })}
                            </div>
                        )}
                    </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              <section className="bg-gray-800/50 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">When to Use It</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {distribution.conditions.map((cond, index) => <li key={index}>{cond}</li>)}
                </ul>
              </section>

              <section className="bg-gray-800/50 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Real-World Examples</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {distribution.realWorldExamples.map((cond, index) => <li key={index}>{cond}</li>)}
                </ul>
              </section>

              <section className="bg-gray-800/50 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">How to Remember</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {distribution.keyTakeaways.map((cond, index) => <li key={index}>{cond}</li>)}
                </ul>
              </section>
            </div>
            
            <section>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-white">Visualized</h3>
                  <div className="flex items-center space-x-2 bg-gray-800 p-1 rounded-lg">
                      <TabButton tabId="overview">Overview</TabButton>
                      <TabButton tabId="cdf">CDF vs ECDF</TabButton>
                      <TabButton tabId="qq">Q-Q Plot</TabButton>
                  </div>
                </div>
              {renderTabContent()}
            </section>
          </div>
    );
};

export default DistributionDetail;