
import React from 'react';

const conceptPairs = [
    {
        title: "The Arena",
        probability: {
            term: "Population",
            description: "The entire, theoretical universe of possibilities. Its properties are assumed to be known.",
            example: "All possible coin flips for eternity."
        },
        statistics: {
            term: "Sample",
            description: "A finite, observed subset of the population. It's what we actually have data for.",
            example: "100 coin flips we performed this morning."
        }
    },
    {
        title: "The Object of Study",
        probability: {
            term: "Random Variables",
            description: "Abstract variables that can take on a set of possible different values, each with some probability.",
            example: "Let X be the outcome of a single coin flip."
        },
        statistics: {
            term: "Realizations (Data)",
            description: "The concrete, observed outcomes of random variables. The actual numbers we record.",
            example: "The coin flip resulted in 'Heads'."
        }
    },
    {
        title: "The Core Assumption",
        probability: {
            term: "IID (Independent & Identically Distributed)",
            description: "We assume events are drawn from the same distribution and don't influence each other.",
            example: "Each coin flip is fair (p=0.5) and doesn't affect the next flip."
        },
        statistics: {
            term: "Random Sampling",
            description: "The practical process we use to collect a sample that is representative of the population.",
            example: "Ensuring our method of flipping the coin is unbiased."
        }
    },
    {
        title: "The Goal",
        probability: {
            term: "Parameters",
            description: "True, fixed values that define the population model. Often represented by Greek letters.",
            example: "The true probability of heads, p."
        },
        statistics: {
            term: "Statistics / Estimates",
            description: "Values calculated from a sample to estimate the unknown population parameters.",
            example: "The sample proportion of heads, p̂."
        }
    }
];

const StatisticsVsProbabilityChart: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="text-center text-gray-300 leading-relaxed max-w-3xl mx-auto">
                <p>
                    Probability and Statistics are two sides of the same coin. Probability is <strong className="text-cyan-400">deductive</strong>: it argues from the general (a known population) to the specific (a predicted sample). Statistics is <strong className="text-pink-400">inductive</strong>: it argues from the specific (an observed sample) to the general (an unknown population).
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                {/* Probability Column */}
                <div className="bg-gray-800/50 p-6 rounded-lg border-t-4 border-cyan-400 h-full space-y-6">
                    <h3 className="text-3xl font-bold text-cyan-400 mb-4 text-center">Probability</h3>
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-900 p-4 rounded-lg text-center w-full">
                            <p className="text-sm text-gray-400 uppercase tracking-wider">Starts with a known</p>
                            <h4 className="text-xl font-semibold text-white">Model / Population</h4>
                        </div>
                        <svg className="w-8 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        <div className="bg-gray-900 p-4 rounded-lg text-center w-full">
                             <p className="text-sm text-gray-400 uppercase tracking-wider">To predict the likelihood of</p>
                            <h4 className="text-xl font-semibold text-white">Data / A Sample</h4>
                        </div>
                    </div>
                </div>

                {/* Statistics Column */}
                <div className="bg-gray-800/50 p-6 rounded-lg border-t-4 border-pink-400 h-full space-y-6">
                    <h3 className="text-3xl font-bold text-pink-400 mb-4 text-center">Statistics</h3>
                     <div className="flex flex-col items-center">
                        <div className="bg-gray-900 p-4 rounded-lg text-center w-full">
                            <p className="text-sm text-gray-400 uppercase tracking-wider">Starts with observed</p>
                            <h4 className="text-xl font-semibold text-white">Data / A Sample</h4>
                        </div>
                        <svg className="w-8 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v17" />
                        </svg>
                        <div className="bg-gray-900 p-4 rounded-lg text-center w-full">
                             <p className="text-sm text-gray-400 uppercase tracking-wider">To infer properties of the</p>
                            <h4 className="text-xl font-semibold text-white">Model / Population</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-bold text-center text-white mb-6">Core Distinctions</h3>
                {conceptPairs.map((pair, index) => (
                    <div key={index} className="mb-8 p-6 bg-gray-800 rounded-xl">
                        <h4 className="text-xl font-semibold text-gray-300 mb-4 text-center border-b border-gray-700 pb-3">{pair.title}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                            {/* Probability Side */}
                            <div className="text-center md:text-right">
                                <h5 className="text-2xl font-bold text-cyan-400">{pair.probability.term}</h5>
                                <p className="text-gray-400 mt-1">{pair.probability.description}</p>
                                <p className="font-mono text-cyan-300/80 text-sm mt-2">e.g., {pair.probability.example}</p>
                            </div>

                            {/* Divider */}
                            <div className="hidden md:flex justify-center items-center">
                                <span className="text-3xl text-gray-600 font-light">&harr;</span>
                            </div>

                             {/* Statistics Side */}
                            <div className="text-center md:text-left">
                                <h5 className="text-2xl font-bold text-pink-400">{pair.statistics.term}</h5>
                                <p className="text-gray-400 mt-1">{pair.statistics.description}</p>
                                 <p className="font-mono text-pink-300/80 text-sm mt-2">e.g., {pair.statistics.example}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatisticsVsProbabilityChart;
