
import React from 'react';
import { distributions as allDistributions } from '../../data/distributions';
import { statisticalConcepts } from '../../data/concepts';

const SummaryPage: React.FC<{ onSelectDist: (id: string) => void, onSelectConcept: (id: string) => void }> = ({ onSelectDist, onSelectConcept }) => {
    return (
        <div className="max-w-7xl mx-auto">
            <header className="mb-10 text-center">
              <h2 className="text-4xl font-extrabold text-white tracking-tight">Environmental Data Analysis</h2>
              <p className="mt-4 text-lg text-gray-400 italic">"Essentially, all models are wrong, but some are useful." - George Box</p>
            </header>
            
            <div className="mb-12">
                <h3 className="text-3xl font-bold text-cyan-400 border-b-2 border-cyan-400/30 pb-2 mb-6">Distributions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {allDistributions.map(dist => (
                        <div key={dist.id} className="bg-gray-800/50 p-6 rounded-xl shadow-lg flex flex-col hover:shadow-cyan-500/20 hover:scale-[1.03] transition-all duration-300">
                            <h3 className="text-xl font-bold text-cyan-400 mb-2">{dist.name}</h3>
                            <p className="text-gray-300 mb-4 flex-grow">{dist.summary}</p>
                            <button onClick={() => onSelectDist(dist.id)} className="mt-auto bg-gray-700 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 self-start">
                                Learn More &rarr;
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-3xl font-bold text-pink-400 border-b-2 border-pink-400/30 pb-2 mb-6">Statistical Concepts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {statisticalConcepts.map(c => (
                        <div key={c.id} className="bg-gray-800/50 p-6 rounded-xl shadow-lg flex flex-col hover:shadow-pink-500/20 hover:scale-[1.03] transition-all duration-300">
                            <h3 className="text-xl font-bold text-pink-400 mb-2">{c.name}</h3>
                            <p className="text-gray-300 mb-4 flex-grow">{c.summary}</p>
                            <button onClick={() => onSelectConcept(c.id)} className="mt-auto bg-gray-700 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 self-start">
                                Explore &rarr;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SummaryPage;