



import React, { useState, useMemo } from 'react';
import { distributions as allDistributions } from './data/distributions';
import { statisticalConcepts } from './data/concepts';
import { Distribution } from './types';
import { StatisticalConcept } from './types';
import SummaryPage from './components/pages/SummaryPage';
import DistributionDetail from './components/pages/DistributionDetail';
import ConceptDetail from './components/pages/ConceptDetail';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<{type: 'summary' | 'dist' | 'concept', id: string | null}>({type: 'summary', id: null});

  const selectedDistribution = useMemo(() => {
    if (activeView.type !== 'dist' || !activeView.id) return null;
    return allDistributions.find(d => d.id === activeView.id);
  }, [activeView]);

  const selectedConcept = useMemo(() => {
    if (activeView.type !== 'concept' || !activeView.id) return null;
    return statisticalConcepts.find(c => c.id === activeView.id);
  }, [activeView]);

  const conceptCategories = useMemo(() => {
    const categories: { [key: string]: StatisticalConcept[] } = {};
    statisticalConcepts.forEach(concept => {
        if (!categories[concept.category]) {
            categories[concept.category] = [];
        }
        categories[concept.category].push(concept);
    });
    // Define a specific order for categories
    const categoryOrder = ['Core Concepts', 'Parametric Tests', 'Nonparametric Tests', 'Forecasting & Modeling'];
    const orderedCategories: { [key: string]: StatisticalConcept[] } = {};
    categoryOrder.forEach(catName => {
        if(categories[catName]) {
            orderedCategories[catName] = categories[catName];
        }
    });
    return orderedCategories;
  }, []);
  
  const renderContent = () => {
      if (selectedDistribution) {
          return <DistributionDetail 
                    distribution={selectedDistribution}
                    allDistributions={allDistributions}
                    setActiveView={setActiveView} 
                />;
      }
      if (selectedConcept) {
          return <ConceptDetail 
                    concept={selectedConcept}
                    allConcepts={statisticalConcepts}
                    setActiveView={setActiveView} 
                />;
      }
      return <SummaryPage 
                onSelectDist={(id) => setActiveView({type: 'dist', id})}
                onSelectConcept={(id) => setActiveView({type: 'concept', id})}
             />;
  }

  const NavButton: React.FC<{isActive: boolean, onClick: () => void, children: React.ReactNode, isConcept?: boolean}> = ({isActive, onClick, children, isConcept = false}) => {
      const activeClasses = isConcept ? 'bg-pink-500 text-white font-semibold shadow-md' : 'bg-cyan-500 text-white font-semibold shadow-md';
      const hoverClasses = isConcept ? 'hover:bg-gray-700' : 'hover:bg-gray-700';
      const ringClasses = isConcept ? 'focus:ring-pink-500' : 'focus:ring-cyan-500';

      return (
         <button
            onClick={onClick}
            className={`w-full text-left px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 ${ringClasses} ${
                isActive ? activeClasses : `${hoverClasses} text-gray-300`
            }`}
        >
            {children}
        </button>
      );
  }
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 font-sans">
      <aside className="w-full md:w-80 bg-gray-800 p-4 md:p-6 shadow-lg flex-shrink-0">
        <h1 className="text-2xl font-bold text-white mb-6">Explorer Menu</h1>
        <nav>
          <ul>
            <li className="mb-2">
                 <NavButton isActive={activeView.type === 'summary'} onClick={() => setActiveView({type: 'summary', id: null})}>
                    Home / Summary
                 </NavButton>
            </li>
            <hr className="border-gray-600 my-4" />
            <h2 className="text-xs uppercase text-gray-400 font-bold tracking-wider px-4 mb-2">Distributions</h2>
            {allDistributions.map((dist) => (
              <li key={dist.id} className="mb-2">
                <NavButton isActive={activeView.type === 'dist' && activeView.id === dist.id} onClick={() => setActiveView({type: 'dist', id: dist.id})}>
                  {dist.name}
                </NavButton>
              </li>
            ))}
            {/* FIX: Cast result of Object.entries to provide a specific type for `concepts`, resolving the `unknown` type error. */}
            {(Object.entries(conceptCategories) as [string, StatisticalConcept[]][]).map(([category, concepts]) => (
                <React.Fragment key={category}>
                    <hr className="border-gray-600 my-4" />
                    <h2 className="text-xs uppercase text-gray-400 font-bold tracking-wider px-4 mb-2">{category}</h2>
                    {concepts.map((concept) => (
                         <li key={concept.id} className="mb-2">
                            <NavButton isConcept isActive={activeView.type === 'concept' && activeView.id === concept.id} onClick={() => setActiveView({type: 'concept', id: concept.id})}>
                                {concept.name}
                            </NavButton>
                         </li>
                    ))}
                </React.Fragment>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {renderContent()}
         <footer className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-500">
            Disclaimer: While efforts have been made for accuracy, it is intended as an educational tool and not a professional statistical software. This application is based on Lectures of CEE 548 Advanced Environment Analysis by Prof. Giuseppe Mascaro at Arizona State University. All calculations and explanations should be verified with authoritative sources. Please send corrections to geokshitij@gmail.com or open an issue on GitHub. Thank you.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;