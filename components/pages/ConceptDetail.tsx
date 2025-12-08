
import React from 'react';
import { StatisticalConcept } from '../../types';
import Formula from '../ui/Formula';

const PearsonFormula = (
    <div className="text-xl font-mono flex items-center justify-center flex-wrap">
      <span>r<sub>xy</sub></span>
      <span className="mx-2">=</span>
      <div className="frac">
        <span>&Sigma;(x<sub>i</sub> - x&#772;)(y<sub>i</sub> - y&#772;)</span>
        <span className="symbol">/</span>
        <span className="bottom">
          &radic;[&Sigma;(x<sub>i</sub> - x&#772;)<sup>2</sup>&Sigma;(y<sub>i</sub> - y&#772;)<sup>2</sup>]
        </span>
      </div>
    </div>
);

// ACF Formula
const ACFFormula = (
    <div className="text-xl font-mono flex items-center justify-center flex-wrap">
      <span>r<sub>k</sub></span>
      <span className="mx-2">=</span>
      <div className="frac">
        <span>&Sigma;<sup>n</sup><sub>t=k+1</sub>(x<sub>t</sub> - x&#772;)(x<sub>t-k</sub> - x&#772;)</span>
        <span className="symbol">/</span>
        <span className="bottom">
            &Sigma;<sup>n</sup><sub>t=1</sub>(x<sub>t</sub> - x&#772;)<sup>2</sup>
        </span>
      </div>
    </div>
);

// Linear Regression Formula
const LinearRegressionFormula = (
    <div className="text-xl font-mono flex items-center justify-center flex-wrap">
      <span>y<sub>i</sub></span>
      <span className="mx-2">= &alpha; + &beta;x<sub>i</sub> + &epsilon;<sub>i</sub></span>
    </div>
);

// Z-Test Formula
const ZTestFormula = (
    <div className="text-xl font-mono flex items-center justify-center flex-wrap">
      <span>Z</span>
      <span className="mx-2">=</span>
      <div className="frac">
        <span>x&#772; - &mu;<sub>0</sub></span>
        <span className="symbol">/</span>
        <span className="bottom">
          &sigma; / &radic;n
        </span>
      </div>
    </div>
);

// t-Test Formula
const TTestFormula = (
    <div className="text-xl font-mono flex items-center justify-center flex-wrap">
      <span>t</span>
      <span className="mx-2">=</span>
      <div className="frac">
        <span>x&#772;<sub>1</sub> - x&#772;<sub>2</sub></span>
        <span className="symbol">/</span>
        <span className="bottom">
         s<sub>p</sub>&radic;(1/n<sub>1</sub> + 1/n<sub>2</sub>)
        </span>
      </div>
    </div>
);

// Chi-Square Test Formula
const ChiSquareFormula = (
    <div className="text-xl font-mono flex items-center justify-center flex-wrap">
      <span>&chi;<sup>2</sup></span>
      <span className="mx-2">= &Sigma;</span>
      <div className="frac">
        <span>(O - E)<sup>2</sup></span>
        <span className="symbol">/</span>
        <span className="bottom">
         E
        </span>
      </div>
    </div>
);

// F-Distribution Formula
const FDistributionFormula = (
    <div className="text-xl font-mono flex items-center justify-center flex-wrap">
      <span>f(x)</span>
      <span className="mx-2">=</span>
      <div className="frac">
        <span>1</span>
        <span className="symbol">/</span>
        <span className="bottom">B(d<sub>1</sub>/2, d<sub>2</sub>/2)</span>
      </div>
      <div className="frac mx-2">
        <span>(d<sub>1</sub>/d<sub>2</sub>)<sup>d<sub>1</sub>/2</sup> x<sup>d<sub>1</sub>/2 - 1</sup></span>
        <span className="symbol">/</span>
        <span className="bottom">(1 + (d<sub>1</sub>/d<sub>2</sub>)x)<sup>(d<sub>1</sub>+d<sub>2</sub>)/2</sup></span>
      </div>
    </div>
);

// ANOVA Formula
const ANOVAFormula = (
     <div className="text-xl font-mono flex flex-col items-center space-y-4">
        <div className="flex items-center">
            <span>F</span>
            <span className="mx-2">=</span>
            <div className="frac">
                <span>MS<sub>between</sub></span>
                <span className="symbol">/</span>
                <span className="bottom">MS<sub>within</sub></span>
            </div>
        </div>
         <div className="text-base font-sans text-gray-400">
             <p>MS<sub>between</sub> = SS<sub>between</sub> / (k-1)</p>
             <p>MS<sub>within</sub> = SS<sub>within</sub> / (N-k)</p>
         </div>
    </div>
);

// Kolmogorov-Smirnov Test Formula
const KSFormula = (
    <div className="text-xl font-mono flex items-center justify-center flex-wrap">
      <span>D</span>
      <span className="mx-2">= sup<sub>x</sub> |F<sub>n</sub>(x) - F(x)|</span>
    </div>
);

// Lilliefors Test Formula
const LillieforsFormula = (
    <div className="text-xl font-mono flex items-center justify-center flex-wrap">
      <span>D</span>
      <span className="mx-2">= sup<sub>x</sub> |F<sub>n</sub>(x) - &Phi;((x - x&#772;)/s)|</span>
    </div>
);


// Likelihood Ratio Test Formula
const LRFormula = (
    <div className="text-xl font-mono flex items-center justify-center flex-wrap">
      <span>&Lambda;</span>
      <span className="mx-2">= -2 ln</span>
      <div className="frac mx-1">
        <span>L(&theta;<sub>0</sub>|data)</span>
        <span className="symbol">/</span>
        <span className="bottom">L(&theta;&#770;|data)</span>
      </div>
    </div>
);

// Mann-Whitney U Test Formula
const MannWhitneyFormula = (
    <div className="text-xl font-mono flex items-center justify-center flex-wrap">
      <span>U<sub>1</sub></span>
      <span className="mx-2">= R<sub>1</sub> -</span>
      <div className="frac">
        <span>n<sub>1</sub>(n<sub>1</sub>+1)</span>
        <span className="symbol">/</span>
        <span className="bottom">2</span>
      </div>
    </div>
);

// Wilcoxon Signed-Rank Test Formula
const WilcoxonFormula = (
    <div className="text-xl font-mono flex items-center justify-center flex-wrap">
      <span>W = min(&Sigma;R<sup>+</sup>, &Sigma;R<sup>-</sup>)</span>
    </div>
);

// Mann-Kendall Test Formula
const MannKendallFormula = (
    <div className="text-xl font-mono flex items-center justify-center flex-wrap">
        <span>S = &Sigma;</span>
        {/* FIX: Replaced `<` with `&lt;` to prevent JSX parsing error. */}
        <sub className="text-base -ml-1 mr-1">i&lt;j</sub>
        <span>sgn(x<sub>j</sub> - x<sub>i</sub>)</span>
    </div>
);

// Sampling Distribution of Coefficients Formula
const SamplingDistributionCoefficientsFormula = (
    <div className="text-xl font-mono flex flex-col items-center space-y-8 p-4 w-full">
        {/* Row for intercept (a) */}
        <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center w-full max-w-lg">
            <div className="text-right">
                <span>E(&#226;) = &alpha;</span>
            </div>
            <div className="flex items-center">
                <span>&sigma;<sub>&#226;</sub></span>
                <span className="mx-2">= s<sub>e</sub></span>
                <span className="text-3xl font-light">[</span>
                <div className="frac mx-1">
                    <span>&Sigma;x<sub>i</sub><sup>2</sup></span>
                    <span className="symbol">/</span>
                    <span className="bottom">n &Sigma;(x<sub>i</sub> - x&#772;)<sup>2</sup></span>
                </div>
                <span className="text-3xl font-light">]</span>
                <sup>1/2</sup>
            </div>
        </div>

        {/* Row for slope (b) */}
        <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center w-full max-w-lg">
            <div className="text-right">
                <span>E(b&#770;) = &beta;</span>
            </div>
            <div className="flex items-center">
                <span>&sigma;<sub>b&#770;</sub></span>
                <span className="mx-2">=</span>
                <div className="frac">
                    <span>s<sub>e</sub></span>
                    <span className="symbol">/</span>
                    <span className="bottom">
                        [ &Sigma;(x<sub>i</sub> - x&#772;)<sup>2</sup> ]<sup>1/2</sup>
                    </span>
                </div>
            </div>
        </div>

        {/* Row for r_a,b */}
        <div className="grid grid-cols-[1fr_2fr] gap-x-4 items-center w-full max-w-lg">
             <div className="text-right"><span>r<sub>a,b</sub></span></div>
             <div className="flex items-center">
                 <span className="mx-2">=</span>
                 <div className="frac">
                    <span>-n x&#772;</span>
                    <span className="symbol">/</span>
                    <span className="bottom">
                        (&Sigma;x<sub>i</sub><sup>2</sup>)<sup>1/2</sup>
                    </span>
                 </div>
             </div>
        </div>
    </div>
);

const DurbinWatsonFormula = (
    <div className="text-xl font-mono flex items-center justify-center flex-wrap">
      <span>d</span>
      <span className="mx-2">=</span>
      <div className="frac">
        <span>&Sigma;<sup>n</sup><sub>t=2</sub>(e<sub>t</sub> - e<sub>t-1</sub>)<sup>2</sup></span>
        <span className="symbol">/</span>
        <span className="bottom">&Sigma;<sup>n</sup><sub>t=1</sub>e<sub>t</sub><sup>2</sup></span>
      </div>
    </div>
);

const StationarityDefinitions = (
    <div className="text-lg font-mono flex flex-col items-start space-y-6 text-left">
        <div>
            <h4 className="text-xl text-cyan-400 mb-2 font-sans font-bold">Strict Stationarity:</h4>
            <p>For any set of time indices t<sub>1</sub>, ..., t<sub>k</sub> and any lag <i>m</i>, the joint distribution of (X<sub>t<sub>1</sub></sub>, ..., X<sub>t<sub>k</sub></sub>) is the same as that of (X<sub>t<sub>1</sub>+m</sub>, ..., X<sub>t<sub>k</sub>+m</sub>).</p>
        </div>
        <div>
            <h4 className="text-xl text-cyan-400 mb-2 font-sans font-bold">Weak Stationarity:</h4>
            <ul className="list-disc list-inside space-y-2">
                <li>E[X<sub>t</sub>] = &mu; (constant mean)</li>
                <li>Var(X<sub>t</sub>) = &sigma;<sup>2</sup> &lt; &infin; (constant, finite variance)</li>
                <li>Cov(X<sub>t</sub>, X<sub>t+h</sub>) = &gamma;(h) (autocovariance depends only on lag <i>h</i>)</li>
            </ul>
        </div>
    </div>
);

const MarkovChainFormula = (
    <div className="text-xl font-mono flex flex-col items-center space-y-4">
        <p className="text-2xl font-sans font-bold text-gray-300">Transition Matrix (P)</p>
        <div className="flex items-center space-x-4">
            <div className="text-right text-lg text-gray-400">
                <p>State 0 (No Rain)</p>
                <p>State 1 (Rain)</p>
            </div>
            <div className="flex items-center text-2xl">
                <span>[</span>
                <div className="text-center mx-2">
                    <p>p<sub>00</sub>, p<sub>01</sub></p>
                    <p>p<sub>10</sub>, p<sub>11</sub></p>
                </div>
                <span>]</span>
            </div>
        </div>
        <p className="text-lg text-gray-400 mt-4">Where p<sub>ij</sub> = Pr(X<sub>t+1</sub> = j | X<sub>t</sub> = i)</p>
    </div>
);

const GeneralMarkovFormulas = (
    <div className="text-xl font-mono flex flex-col items-start space-y-8 text-left">
        {/* s-state, 1st order */}
        <div>
            <h4 className="text-lg text-cyan-400 mb-2 font-sans font-bold">Estimation (s-State, 1st Order)</h4>
            <div className="flex items-center">
                <span>P&#770;<sub>ij</sub></span>
                <span className="mx-2">=</span>
                <div className="frac">
                    <span>n<sub>ij</sub></span>
                    <span className="symbol">/</span>
                    <span className="bottom">n<sub>i.</sub></span>
                </div>
                 <span className="ml-4 text-base font-sans text-gray-400">, i, j = 1, ..., s</span>
            </div>
             <p className="text-sm font-sans text-gray-400 mt-2">Where n<sub>ij</sub> is the number of transitions from state i to j, and n<sub>i.</sub> is the total number of times the system was in state i.</p>
        </div>

        {/* s-state, 2nd order */}
        <div>
            <h4 className="text-lg text-cyan-400 mb-2 font-sans font-bold">Estimation (s-State, 2nd Order)</h4>
            <div className="flex items-center">
                <span>P&#770;<sub>hij</sub></span>
                <span className="mx-2">=</span>
                <div className="frac">
                    <span>n<sub>hij</sub></span>
                    <span className="symbol">/</span>
                    <span className="bottom">n<sub>hi.</sub></span>
                </div>
            </div>
            <p className="text-sm font-sans text-gray-400 mt-2">Where n<sub>hij</sub> is the count of transitions h &rarr; i &rarr; j, and n<sub>hi.</sub> is the total count of transitions from h &rarr; i.</p>
        </div>
    </div>
);

const ModelSelectionFormulas = (
     <div className="text-xl font-mono flex flex-col items-start space-y-8 text-left">
        {/* AIC and BIC */}
        <div className="space-y-4">
             <h4 className="text-lg text-cyan-400 mb-2 font-sans font-bold">AIC and BIC Criteria</h4>
            <div className="flex items-center">
                <span className="w-28">AIC(m)</span>
                <span className="mx-2">=</span>
                <span>-2L<sub>m</sub> + 2s<sup>m</sup>(s - 1)</span>
            </div>
             <div className="flex items-center">
                <span className="w-28">BIC(m)</span>
                <span className="mx-2">=</span>
                <span>-2L<sub>m</sub> + s<sup>m</sup>ln(n)</span>
            </div>
        </div>
        
        {/* L_m */}
        <div>
            <p className="text-base font-sans text-gray-400 mb-2">
                Where L<sub>m</sub> is the log-likelihood of the chain of order m. For m=2:
            </p>
            <div className="flex items-center">
                <span>L<sub>2</sub></span>
                <span className="mx-2">=</span>
                <div className="flex items-center">
                    <div className="text-center text-sm mr-1">
                        <span>s-1</span>
                        <span className="text-3xl">&Sigma;</span>
                        <span>h=0</span>
                    </div>
                     <div className="text-center text-sm mr-1">
                        <span>s-1</span>
                        <span className="text-3xl">&Sigma;</span>
                        <span>i=0</span>
                    </div>
                     <div className="text-center text-sm mr-1">
                        <span>s-1</span>
                        <span className="text-3xl">&Sigma;</span>
                        <span>j=0</span>
                    </div>
                </div>
                <span>n<sub>hij</sub>ln(P&#770;<sub>hij</sub>)</span>
            </div>
        </div>
    </div>
);

const AR1ModelFormula = (
    <div className="text-xl font-mono flex flex-col items-center space-y-4">
        <p>x<sub>t+1</sub> - &mu; = &phi;(x<sub>t</sub> - &mu;) + &epsilon;<sub>t+1</sub></p>
        <p className="text-lg font-sans text-gray-400">or, for a mean-centered series z<sub>t</sub> = x<sub>t</sub> - &mu;:</p>
        <p>z<sub>t+1</sub> = &phi;z<sub>t</sub> + &epsilon;<sub>t+1</sub></p>
    </div>
);

const AR1PropertiesFormulas = (
    <div className="text-lg font-mono flex flex-col items-start space-y-8 text-left p-4">
        {/* Markov Process */}
        <div>
            <h4 className="text-xl text-cyan-400 mb-2 font-sans font-bold">Markov Property</h4>
            {/* FIX: Replaced {...} with (...) to prevent JSX parsing errors. */}
            <p className="text-base md:text-lg">Pr(X<sub>t+1</sub> &le; x | X<sub>t</sub>, X<sub>t-1</sub>, ...) = Pr(X<sub>t+1</sub> &le; x | X<sub>t</sub>)</p>
        </div>
        
        {/* NEW: Process Variance */}
        <div>
            <h4 className="text-xl text-cyan-400 mb-2 font-sans font-bold">Process Variance (σ²ₓ)</h4>
            <div className="flex items-center text-2xl">
                <span>&sigma;<sub>x</sub><sup>2</sup></span>
                <span className="mx-2">=</span>
                <div className="frac mx-1">
                    <span>&sigma;<sub>&epsilon;</sub><sup>2</sup></span>
                    <span className="symbol">/</span>
                    <span className="bottom">1 - &phi;<sup>2</sup></span>
                </div>
            </div>
        </div>
        
        {/* Autocorrelation & Stationarity */}
        <div className="flex flex-wrap items-start gap-x-16 gap-y-4">
             <div>
                 <h4 className="text-xl text-cyan-400 mb-2 font-sans font-bold">Autocorrelation (ρₖ)</h4>
                 <p className="text-2xl">&rho;<sub>k</sub> = &phi;<sup>k</sup></p>
            </div>
            <div>
                 <h4 className="text-xl text-cyan-400 mb-2 font-sans font-bold">Stationarity Condition</h4>
                 <p className="text-2xl">|&phi;| &lt; 1</p>
            </div>
        </div>
        
        {/* Estimation */}
        <div>
            <h4 className="text-xl text-cyan-400 mb-3 font-sans font-bold">Parameter Estimation From a Sample</h4>
            <div className="flex flex-col md:flex-row md:items-start gap-x-12 gap-y-6">
                {/* Phi Hat & t-test */}
                <div className="space-y-6">
                    <div className="text-center">
                        <p className="text-base font-sans text-gray-400">Estimate for φ</p>
                        <p className="text-2xl mt-1">&phi;&#770; = r<sub>1</sub></p>
                    </div>
                     <div className="text-center">
                        <p className="text-base font-sans text-gray-400">Test for H₀: φ=0</p>
                        <div className="flex items-center mt-2 text-xl">
                            <span>z =</span>
                            <div className="frac mx-2">
                                <span>&phi;&#770; - 0</span>
                                <span className="symbol">/</span>
                                <span className="bottom">[Var(&phi;&#770;)]<sup>1/2</sup></span>
                            </div>
                            <span>&asymp;</span>
                             <div className="frac mx-2">
                                <span>&phi;&#770;</span>
                                <span className="symbol">/</span>
                                <span className="bottom">[1/n]<sup>1/2</sup></span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Variance */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <p className="text-base font-sans text-gray-400">Estimate for Error Variance (s²_ε)</p>
                        <p className="text-2xl mt-1">s&#770;<sub>&epsilon;</sub><sup>2</sup></p>
                    </div>
                    <div className="flex items-center">
                        <span className="mx-2">=</span>
                         <div className="frac mx-1">
                            <span>1 - &phi;&#770;<sup>2</sup></span>
                            <span className="symbol">/</span>
                            <span className="bottom">n - 2</span>
                        </div>
                        <span>&Sigma;(x<sub>t</sub>-x&#772;)<sup>2</sup></span>
                        <span className="mx-2">=</span>
                        <div className="frac mx-1">
                            <span>n - 1</span>
                            <span className="symbol">/</span>
                            <span className="bottom">n - 2</span>
                        </div>
                         <span>(1 - &phi;&#770;<sup>2</sup>)s<sub>x</sub><sup>2</sup></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const RawMomentFormula = (
    <div className="text-xl font-mono flex items-center justify-center flex-wrap">
      <span>&mu;'<sub>k</sub> = E[X<sup>k</sup>]</span>
    </div>
);
const CentralMomentFormula = (
    <div className="text-xl font-mono flex items-center justify-center flex-wrap">
      <span>&mu;<sub>k</sub> = E[(X - &mu;)<sup>k</sup>]</span>
    </div>
);

const ConceptDetail: React.FC<{ 
    concept: StatisticalConcept,
    allConcepts: StatisticalConcept[],
    setActiveView: (view: { type: 'dist' | 'concept'; id: string | null }) => void;
}> = ({ concept, allConcepts, setActiveView }) => {
    
    const currentIndex = allConcepts.findIndex(c => c.id === concept.id);
    const prevConcept = currentIndex > 0 ? allConcepts[currentIndex - 1] : null;
    const nextConcept = currentIndex < allConcepts.length - 1 ? allConcepts[currentIndex + 1] : null;

    return (
        <div className="max-w-5xl mx-auto">
            <header className="mb-4">
                <h2 className="text-4xl font-extrabold text-white tracking-tight">{concept.name}</h2>
                <p className="mt-2 text-lg text-gray-400">{concept.summary}</p>
            </header>
            
            <nav className="flex justify-between items-center mb-8 text-sm">
                <div>
                    {prevConcept && (
                        <button 
                            onClick={() => setActiveView({ type: 'concept', id: prevConcept.id })}
                            className="flex items-center space-x-2 text-gray-400 hover:text-pink-400 transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            <span>{prevConcept.name}</span>
                        </button>
                    )}
                </div>
                <div>
                    {nextConcept && (
                         <button 
                            onClick={() => setActiveView({ type: 'concept', id: nextConcept.id })}
                            className="flex items-center space-x-2 text-gray-400 hover:text-pink-400 transition-colors duration-200"
                        >
                             <span>{nextConcept.name}</span>
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    )}
                </div>
            </nav>

            <section className="mb-8 space-y-6">
                {concept.id === 'hypothesis-testing' && (
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">Hypothesis testing is the formal procedure statisticians use to test whether a claim (or 'hypothesis') about a population is likely to be true. It provides a consistent framework for making decisions based on data. Think of it as the scientific method, but for data analysis. The entire process revolves around comparing what we *observe* in our sample to what we would *expect* to see if a default assumption (the null hypothesis) were true.</p>
                    </div>
               )}
                {concept.id === 'acf' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">The <strong>Autocorrelation Function (ACF)</strong> is a critical tool in time series analysis for identifying patterns and dependencies. It measures the correlation between a time series and a lagged version of itself. In simple terms, it answers the question: "How much does the value of my series today depend on its value yesterday, the day before, and so on?"</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Interpreting the ACF Plot</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">The ACF is typically visualized as a bar chart showing the correlation at different lags:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li><strong>Significant Lags:</strong> The plot includes confidence bands (usually at 95%). Lags where the correlation bar extends beyond these bands are considered statistically significant.</li>
                            <li><strong>White Noise:</strong> For a completely random series (white noise), we expect all autocorrelations to be near zero, with about 5% of them falling outside the confidence bands just by chance.</li>
                            <li><strong>AR(1) Process:</strong> A time series where the current value depends on the immediately preceding value will show an ACF that decays exponentially towards zero.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formula</h3>
                        <Formula formula={ACFFormula} />
                        <div className="bg-gray-800/50 p-6 rounded-lg mt-4">
                            <h5 className="font-semibold text-cyan-400 mb-3 text-lg">Where:</h5>
                            <ul className="list-disc list-inside text-gray-300 space-y-3">
                                <li><code className="font-mono bg-gray-700 p-1 rounded">r<sub>k</sub></code> is the sample autocorrelation at lag k.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">x<sub>t</sub></code> is the value of the series at time t.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">x&#772;</code> is the sample mean of the series.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">n</code> is the number of observations in the series.</li>
                            </ul>
                        </div>
                    </div>
                </>
               )}
                {concept.id === 'z-test' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">The <strong>Z-test</strong> is used to determine whether a sample mean is significantly different from a known or hypothesized population mean, under the critical assumption that the <strong>population's standard deviation (σ) is known</strong>.</p>
                    </div>
                     <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Core Question</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"Does my sample likely come from a population with this specific mean, given I know the population's variability?"</blockquote>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-800/50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-cyan-400 mb-3">When to Use It</h3>
                            <p className="text-gray-300 leading-relaxed">This test is less common in practice than the t-test because we rarely know the true population standard deviation. However, it's a foundational concept and is appropriate when dealing with very large sample sizes (e.g., n &gt; 100), where the sample standard deviation becomes a very reliable estimate of the population standard deviation.</p>
                        </div>
                        <div className="bg-gray-800/50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-cyan-400 mb-3">Key Concepts</h3>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                                <li>The <strong>Z-statistic</strong> measures how many standard deviations the sample mean is away from the population mean.</li>
                                <li>The null distribution is always the Standard Normal Distribution (μ=0, σ=1), regardless of sample size.</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formula</h3>
                        <Formula formula={ZTestFormula} />
                        <div className="bg-gray-800/50 p-6 rounded-lg mt-4">
                            <h5 className="font-semibold text-cyan-400 mb-3 text-lg">Where:</h5>
                            <ul className="list-disc list-inside text-gray-300 space-y-3">
                                <li><code className="font-mono bg-gray-700 p-1 rounded">Z</code> is the calculated Z-statistic.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">x&#772;</code> (x-bar) is the mean of your sample.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">&mu;<sub>0</sub></code> is the population mean, according to the null hypothesis.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">&sigma;</code> is the known standard deviation of the population.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">n</code> is the sample size.</li>
                            </ul>
                        </div>
                    </div>
                </>
               )}
               {concept.id === 't-test' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">The <strong>t-test</strong> is a workhorse of statistics. You use it when you want to compare the average (mean) of two groups to see if they are genuinely different from each other.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Core Question</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"Is the difference between the means of my two samples large enough to say that the underlying groups they come from are also different, or could this difference have just happened by random chance?"</blockquote>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Key Concepts</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 leading-relaxed">
                            <li>The <strong>t-statistic</strong> is a number that captures this difference. A larger t-statistic means a larger difference between groups relative to the variation within the groups.</li>
                            <li>By adjusting the parameters in the interactive visualization, notice how the t-statistic gets bigger when: the means are further apart, the standard deviations are smaller, or the sample sizes are larger.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formula</h3>
                        <Formula formula={TTestFormula} />
                         <div className="bg-gray-800/50 p-6 rounded-lg mt-4">
                            <h5 className="font-semibold text-cyan-400 mb-3 text-lg">Where:</h5>
                            <ul className="list-disc list-inside text-gray-300 space-y-3">
                                <li><code className="font-mono bg-gray-700 p-1 rounded">t</code> is the calculated t-statistic.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">x&#772;<sub>1</sub></code> and <code className="font-mono bg-gray-700 p-1 rounded">x&#772;<sub>2</sub></code> are the means of sample 1 and sample 2.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">n<sub>1</sub></code> and <code className="font-mono bg-gray-700 p-1 rounded">n<sub>2</sub></code> are the sizes of sample 1 and sample 2.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">s<sub>p</sub></code> is the pooled standard deviation, a weighted average of the two sample standard deviations.</li>
                            </ul>
                        </div>
                    </div>
                </>
               )}
               {concept.id === 'chi-square-test' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                         <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                         <p className="text-gray-300 leading-relaxed">The <strong>Chi-Square (χ²) Test of Independence</strong> is used when you have categorical data (like 'Yes/No' or 'Democrat/Republican/Independent') and you want to see if two variables are related. For example: "Is there a relationship between a person's age group and their preferred social media platform?"</p>
                    </div>
                     <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Core Question</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"Are my two categorical variables independent, or is there some association between them?"</blockquote>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">How it Works</h3>
                        <ol className="list-decimal list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li><strong>Observed Counts:</strong> First, we tabulate our actual, observed data into a contingency table.</li>
                            <li><strong>Expected Counts:</strong> Then, we calculate what the counts *would* look like in an ideal world where there is absolutely no relationship between the variables (this is our null hypothesis).</li>
                            <li><strong>The χ² statistic:</strong> This number measures the total difference between the observed and expected counts. The bigger the number, the worse our "no relationship" hypothesis fits the data.</li>
                        </ol>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formula</h3>
                        <Formula formula={ChiSquareFormula} />
                        <div className="bg-gray-800/50 p-6 rounded-lg mt-4">
                            <h5 className="font-semibold text-cyan-400 mb-3 text-lg">Where:</h5>
                            <ul className="list-disc list-inside text-gray-300 space-y-3">
                                <li><code className="font-mono bg-gray-700 p-1 rounded">&chi;<sup>2</sup></code> is the calculated Chi-Square statistic.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">&Sigma;</code> means we sum the results for all cells in our table.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">O</code> is the Observed frequency (the actual count in a cell).</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">E</code> is the Expected frequency (the count we'd expect if there were no relationship).</li>
                            </ul>
                        </div>
                    </div>
                </>
               )}
               {concept.id === 'anova' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed"><strong>Analysis of Variance (ANOVA)</strong> is the standard method for testing for a significant difference between the means of three or more groups. It's an extension of the t-test. Instead of running multiple t-tests (which would inflate our Type I error rate), ANOVA lets us test all the groups at once.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Core Question</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"Is the variation *between* the group means significantly larger than the variation *within* the groups?"</blockquote>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">How it Works</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">ANOVA's genius is in its name: it analyzes variance. It partitions the total variability in the data into two components:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li><strong>Between-Group Variance (SSB):</strong> How much the means of the different groups vary from the overall grand mean. If this is large, the groups look different.</li>
                            <li><strong>Within-Group Variance (SSW):</strong> How much the individual data points vary around their own group's mean. This represents the natural, random noise in the data.</li>
                        </ul>
                        <p className="text-gray-300 leading-relaxed mt-3">The <strong>F-statistic</strong> is the ratio of these two variances (after being adjusted for degrees of freedom). A large F-statistic suggests that the variation between groups is much larger than the noise within them, leading us to reject the null hypothesis that all group means are equal.</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formula</h3>
                        <Formula formula={ANOVAFormula} />
                    </div>
                </>
               )}
               {concept.id === 'f-distribution' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">The <strong>F-distribution</strong> is a continuous probability distribution that arises frequently in statistics. It's most famously known as the null distribution for the F-statistic in ANOVA and regression analysis. At its core, it's the distribution of a ratio of two independent chi-square (χ²) variables, each divided by its degrees of freedom.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Key Properties</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li>It's defined by two parameters: <strong>numerator degrees of freedom (d1)</strong> and <strong>denominator degrees of freedom (d2)</strong>.</li>
                            <li>It's a right-skewed distribution.</li>
                            <li>It only takes non-negative values.</li>
                            <li>The shape of the distribution changes significantly based on d1 and d2. As the degrees of freedom increase, the F-distribution becomes more concentrated and bell-shaped.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formula</h3>
                        <Formula formula={FDistributionFormula} />
                    </div>
                </>
               )}
               {concept.id === 'ks-test' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">The <strong>Kolmogorov-Smirnov (K-S) test</strong> is a "goodness-of-fit" test. It's designed to answer a simple question. Instead of comparing parameters like the mean, the K-S test compares the entire shape of the distributions by looking at their Cumulative Distribution Functions (CDFs).</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Core Question</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"Is it plausible that my collected sample of data was drawn from this specific theoretical distribution (e.g., a Normal distribution)?"</blockquote>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">How it Works</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li>It plots the <strong>Empirical CDF (ECDF)</strong> from your sample data, which is a step function showing the proportion of data less than or equal to each value.</li>
                            <li>It then overlays the <strong>theoretical CDF</strong> of the distribution you're testing against.</li>
                            <li>The <strong>K-S statistic (D)</strong> is simply the single largest vertical gap anywhere along the graph between the ECDF and the theoretical CDF. A bigger gap means a worse fit.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formula</h3>
                        <Formula formula={KSFormula} />
                        <div className="bg-gray-800/50 p-6 rounded-lg mt-4">
                            <h5 className="font-semibold text-cyan-400 mb-3 text-lg">Where:</h5>
                            <ul className="list-disc list-inside text-gray-300 space-y-3">
                                <li><code className="font-mono bg-gray-700 p-1 rounded">D</code> is the K-S test statistic, the maximum difference.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">sup<sub>x</sub></code> stands for the supremum, which is the least upper bound (effectively the maximum) over all possible values of x.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">F<sub>n</sub>(x)</code> is the Empirical Distribution Function (EDF) from your sample.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">F(x)</code> is the theoretical Cumulative Distribution Function (CDF) you are testing against.</li>
                            </ul>
                        </div>
                    </div>
                </>
               )}
               {concept.id === 'lilliefors-test' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">The <strong>Lilliefors test</strong> is a special adaptation of the Kolmogorov-Smirnov test used specifically to test the null hypothesis that your data comes from a <strong>normally distributed population</strong>, but when the mean (μ) and standard deviation (σ) are <strong>unknown</strong>. This is a much more common scenario than the standard K-S test for normality.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Core Question</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"Does my data look like it came from *some* Normal distribution, without me having to know which one beforehand?"</blockquote>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">How it Works</h3>
                        <ol className="list-decimal list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li><strong>Estimate Parameters:</strong> It first calculates the sample mean (x̄) and sample standard deviation (s) from your data.</li>
                            <li><strong>Standardize:</strong> It then standardize your data points using these sample estimates: zᵢ = (xᵢ - x̄) / s.</li>
                            <li><strong>Compare CDFs:</strong> It calculates the K-S statistic (D) by finding the maximum difference between the Empirical CDF of your *standardized* data and the CDF of a *standard Normal* distribution (μ=0, σ=1).</li>
                            <li><strong>Special Critical Values:</strong> Because we used estimated parameters, the D statistic is generally smaller than it would be in a standard K-S test. Therefore, it uses its own special, smaller critical values to determine significance.</li>
                        </ol>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formula</h3>
                        <Formula formula={LillieforsFormula} />
                        <div className="bg-gray-800/50 p-6 rounded-lg mt-4">
                            <h5 className="font-semibold text-cyan-400 mb-3 text-lg">Where:</h5>
                            <ul className="list-disc list-inside text-gray-300 space-y-3">
                                <li><code className="font-mono bg-gray-700 p-1 rounded">D</code> is the Lilliefors test statistic.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">F<sub>n</sub>(x)</code> is the Empirical Distribution Function (EDF) from your sample.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">&Phi;</code> is the Cumulative Distribution Function (CDF) of the <strong>Standard Normal</strong> distribution.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">x&#772;</code> is the sample mean and <code className="font-mono bg-gray-700 p-1 rounded">s</code> is the sample standard deviation.</li>
                            </ul>
                        </div>
                    </div>
                </>
               )}
               {concept.id === 'lr-test' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">The <strong>Likelihood Ratio Test (LRT)</strong> is a powerful and flexible method for comparing two "nested" statistical models. Nested means one model (the simple/null model) is a special case of the other (the complex/alternative model). For example, we can compare a simple model where our data is from a Standard Normal distribution (μ=0, σ=1) to a complex model where the data is from a Normal distribution with *any* mean and standard deviation. The LRT tells us if the added flexibility of estimating μ and σ is justified.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Core Question</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"Does adding more complexity (parameters) to my model provide a significantly better explanation of the data?"</blockquote>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Key Concepts</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li>It calculates the <strong>maximum likelihood</strong> for the data under both models.</li>
                            <li>The <strong>LR statistic</strong> is based on the ratio of these likelihoods. A larger statistic indicates that the complex model fits the data much better.</li>
                            <li>This statistic conveniently follows a Chi-Square (χ²) distribution, which allows us to get a p-value.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formula</h3>
                        <Formula formula={LRFormula} />
                        <div className="bg-gray-800/50 p-6 rounded-lg mt-4">
                            <h5 className="font-semibold text-cyan-400 mb-3 text-lg">Where:</h5>
                            <ul className="list-disc list-inside text-gray-300 space-y-3">
                                <li><code className="font-mono bg-gray-700 p-1 rounded">&Lambda;</code> (Lambda) is the Likelihood Ratio test statistic.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">ln</code> is the natural logarithm.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">L(&theta;<sub>0</sub>|data)</code> is the likelihood of the data under the simpler (null) model.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">L(&theta;&#770;|data)</code> is the maximized likelihood of the data under the more complex (alternative) model.</li>
                            </ul>
                        </div>
                    </div>
                </>
               )}
               {concept.id === 'mann-whitney' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">The <strong>Wilcoxon-Mann-Whitney U Test</strong> (also called the Rank-Sum Test) is a non-parametric alternative to the independent samples t-test. It's used to determine if two independent samples were selected from populations having the same distribution. Because it uses ranks instead of the actual data values, it is not sensitive to outliers. This makes it a very <strong>robust</strong> test.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Core Question</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"If I mix my two samples together and rank every data point from smallest to largest, do the ranks from Group A tend to be systematically higher or lower than the ranks from Group B?"</blockquote>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Key Features</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li>The test does not assume the data follows a Normal distribution.</li>
                            <li>It's perfect for when your data is skewed or has outliers that would violate the assumptions of a t-test.</li>
                            <li>In the visualization, try adding an outlier and see how little the U-test result changes compared to a t-test on the same data.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formula</h3>
                        <Formula formula={MannWhitneyFormula} />
                        <div className="bg-gray-800/50 p-6 rounded-lg mt-4">
                            <h5 className="font-semibold text-cyan-400 mb-3 text-lg">Where:</h5>
                            <ul className="list-disc list-inside text-gray-300 space-y-3">
                                <li><code className="font-mono bg-gray-700 p-1 rounded">U<sub>1</sub></code> is the U statistic for sample 1.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">R<sub>1</sub></code> is the sum of the ranks for all observations in sample 1.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">n<sub>1</sub></code> is the size of sample 1.</li>
                                <li className="pt-2">Note: The final test statistic <code className="font-mono bg-gray-700 p-1 rounded">U</code> is the smaller of <code className="font-mono bg-gray-700 p-1 rounded">U<sub>1</sub></code> and <code className="font-mono bg-gray-700 p-1 rounded">U<sub>2</sub></code>, where <code className="font-mono bg-gray-700 p-1 rounded">U<sub>2</sub> = n<sub>1</sub>n<sub>2</sub> - U<sub>1</sub></code>.</li>
                            </ul>
                        </div>
                    </div>
                </>
               )}
               {concept.id === 'wilcoxon-signed-rank' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">The <strong>Wilcoxon Signed-Rank Test</strong> is the non-parametric version of a paired t-test. It's used for matched-pair data, like "before" and "after" measurements on the same subject, to see if there's a significant change. It provides a robust way to analyze paired data without assuming the differences are normally distributed.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Core Question</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"After accounting for the direction of the change (positive or negative), are the magnitudes of the changes in one direction systematically larger than in the other?"</blockquote>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">How it Works</h3>
                        <ol className="list-decimal list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li>Calculate the difference for each pair (e.g., After - Before).</li>
                            <li>Ignore any pairs with a difference of zero.</li>
                            <li>Rank the *absolute values* of the remaining differences from smallest to largest.</li>
                            <li>Sum the ranks for all the positive differences and the ranks for all the negative differences.</li>
                            <li>The test statistic (W) is the smaller of these two sums. A very small W suggests a significant, consistent change.</li>
                        </ol>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formula</h3>
                        <Formula formula={WilcoxonFormula} />
                        <div className="bg-gray-800/50 p-6 rounded-lg mt-4">
                            <h5 className="font-semibold text-cyan-400 mb-3 text-lg">Where:</h5>
                            <ul className="list-disc list-inside text-gray-300 space-y-3">
                                <li><code className="font-mono bg-gray-700 p-1 rounded">W</code> is the Wilcoxon test statistic.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">&Sigma;R<sup>+</sup></code> is the sum of ranks corresponding to positive differences.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">&Sigma;R<sup>-</sup></code> is the sum of ranks corresponding to negative differences.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">min()</code> indicates that W is the smaller of the two rank sums.</li>
                            </ul>
                        </div>
                    </div>
                </>
               )}
               {concept.id === 'mann-kendall' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">The <strong>Mann-Kendall Trend Test</strong> is a non-parametric test used to detect a monotonic trend (consistently increasing or decreasing) in time series data. It's widely used in environmental and climate science. The intuition is simple and powerful: it compares every data point to every subsequent data point.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Core Question</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"Is there a consistent upward or downward trend in my data over time, or are the fluctuations just random noise?"</blockquote>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Key Concepts</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li>It scores a "+1" if a later point is higher than an earlier point and a "-1" if it's lower.</li>
                            <li>The <strong>Mann-Kendall statistic (S)</strong> is the sum of all these +1s and -1s.</li>
                            <li>A large positive S indicates an increasing trend; a large negative S indicates a decreasing trend. An S close to zero suggests no trend.</li>
                            <li>Because it doesn't care *how much* higher or lower the points are, only the direction, it is not affected by seasonal patterns or skewed data.</li>
                            <li>For larger sample sizes (n &gt; 10), the test statistic `S` is approximately normally distributed (Gaussian). This allows us to calculate a standardized Z-statistic and a p-value to determine the trend's significance.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formula</h3>
                        <Formula formula={MannKendallFormula} />
                        <div className="bg-gray-800/50 p-6 rounded-lg mt-4">
                            <h5 className="font-semibold text-cyan-400 mb-3 text-lg">Where:</h5>
                            <ul className="list-disc list-inside text-gray-300 space-y-3">
                                <li><code className="font-mono bg-gray-700 p-1 rounded">S</code> is the Mann-Kendall S statistic.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">&Sigma;<sub>i&lt;j</sub></code> represents summing over all pairs of data points where one point comes after the other.</li>
                                 <li><code className="font-mono bg-gray-700 p-1 rounded">x<sub>j</sub></code> and <code className="font-mono bg-gray-700 p-1 rounded">x<sub>i</sub></code> are data values at later time j and earlier time i.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">sgn()</code> is the sign function, which returns +1, -1, or 0 based on the sign of the difference.</li>
                            </ul>
                        </div>
                    </div>
                </>
               )}
               {concept.id === 'type-errors' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Analogy: A Medical Test</h3>
                        <p className="text-gray-300 leading-relaxed">Imagine a medical test for a disease. The <strong>Null Hypothesis (H₀)</strong> is "The patient is healthy." The <strong>Alternative (H₁)</strong> is "The patient is sick." There are two ways the test can be wrong:</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-pink-500">
                             <h3 className="text-xl font-bold text-pink-400 mb-3">🚨 Type I Error (α) - "False Alarm"</h3>
                             <p className="text-gray-300 leading-relaxed">The test tells a healthy person they are sick. We reject the null hypothesis (that they're healthy) when it's actually true. This is a <strong>false positive</strong>. Think: "Crying wolf when there is no wolf."</p>
                        </div>
                         <div className="bg-gray-800/50 p-6 rounded-lg border-l-4 border-orange-500">
                             <h3 className="text-xl font-bold text-orange-400 mb-3">💔 Type II Error (β) - "Missed Detection"</h3>
                             <p className="text-gray-300 leading-relaxed">The test tells a sick person they are healthy. We fail to reject the null hypothesis when it's actually false. This is a <strong>false negative</strong>. Think: "Missing the wolf when it's right there."</p>
                        </div>
                    </div>
                     <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Trade-Off</h3>
                        <p className="text-gray-300 leading-relaxed">The chart below shows the delicate balance. If you make the test super-sensitive to avoid missing any sick people (low β), you might accidentally classify more healthy people as sick (high α). This trade-off is fundamental to statistics.</p>
                    </div>
                </>
               )}
               {concept.id === 'p-value' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Analogy: A Courtroom Trial</h3>
                        <p className="text-gray-300 leading-relaxed">Think of a courtroom trial. The <strong>Null Hypothesis (H₀)</strong> is "The defendant is innocent." We then look at the evidence. The <strong>p-value</strong> is the answer to this question:</p>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg my-4">"If the defendant is truly innocent, what is the probability of seeing evidence this strong (or even stronger) against them just by random chance?"</blockquote>
                    </div>
                     <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Interpreting the P-value</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-3 leading-relaxed">
                            <li>A <strong>small p-value</strong> (e.g., 0.01) is like finding the defendant's DNA at the scene. It's very unlikely you'd find that if they were innocent. This strong evidence leads you to <strong>reject the "innocent" hypothesis</strong>.</li>
                            <li>A <strong>large p-value</strong> (e.g., 0.40) is like finding a common hair color at the scene. It doesn't mean they're innocent, but the evidence isn't surprising at all. You <strong>fail to reject the "innocent" hypothesis</strong> due to lack of strong evidence.</li>
                        </ul>
                        <p className="mt-4 text-gray-300 leading-relaxed">The p-value is a measure of surprise. The lower it is, the more you should doubt the null hypothesis.</p>
                    </div>
                </>
               )}
                {concept.id === 'mom' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">The <strong>Method of Moments (MoM)</strong> is one of the oldest and most intuitive ways to estimate parameters for a distribution from data. The core idea is simple: make the theoretical properties of the distribution match the observed properties of your sample. It's like saying, "I'll assume my sample's mean is the best guess for the distribution's true mean."</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What are Moments?</h3>
                        <p className="text-gray-300 leading-relaxed">In statistics, a "moment" is a quantitative measure that describes the shape of a probability distribution. They give us a systematic way to characterize a dataset's key properties. There are two main types:</p>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-semibold text-white">Raw Moments (about the origin)</h4>
                                <p className="text-sm text-gray-400 mb-2">These are moments calculated around zero.</p>
                                <Formula formula={RawMomentFormula} />
                            </div>
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-semibold text-white">Central Moments (about the mean)</h4>
                                <p className="text-sm text-gray-400 mb-2">These are moments calculated around the distribution's mean (&mu;). They are often more useful as they describe the shape irrespective of location.</p>
                                <Formula formula={CentralMomentFormula} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The First Four Moments (Intuition)</h3>
                        <ul className="space-y-4">
                            <li className="p-3 bg-gray-900/50 rounded-md"><strong>1st Moment (Mean):</strong> The first raw moment (k=1) is the mean. It tells you the distribution's center of gravity or its central location.</li>
                            <li className="p-3 bg-gray-900/50 rounded-md"><strong>2nd Moment (Variance):</strong> The second central moment (k=2) is the variance. It measures the "spread" or "width" of the distribution. A larger variance means the data is more spread out.</li>
                            <li className="p-3 bg-gray-900/50 rounded-md"><strong>3rd Moment (Skewness):</strong> The third standardized central moment measures asymmetry. A positive skew means a longer tail to the right; a negative skew means a longer tail to the left. A value of 0 indicates symmetry (like the Normal distribution).</li>
                            <li className="p-3 bg-gray-900/50 rounded-md"><strong>4th Moment (Kurtosis):</strong> The fourth standardized central moment measures the "tailedness." High kurtosis means more data in the tails (more frequent extreme outliers) and a sharper peak, a property known as being "leptokurtic." Low kurtosis means lighter tails and a flatter peak ("platykurtic").</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">How it Works</h3>
                        <ol className="list-decimal list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li><strong>Step 1:</strong> Write down the theoretical "moments" of the distribution (like the mean and variance) in terms of its parameters (e.g., for Gamma, Mean = αβ, Variance = αβ²).</li>
                            <li><strong>Step 2:</strong> Calculate the corresponding "sample moments" from your actual data (the sample mean and sample variance).</li>
                            <li><strong>Step 3:</strong> Set them equal to each other and solve for the parameters!</li>
                        </ol>
                        <p className="mt-4 text-gray-300 leading-relaxed">Use the tool below to see how the estimates change with different random samples.</p>
                    </div>
                </>
               )}
               {concept.id === 'mle' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed"><strong>Maximum Likelihood Estimation (MLE)</strong> is a powerful and popular method for parameter estimation. Imagine you flipped a coin 10 times and got 7 heads. The MLE for the probability of heads, `p`, would be 0.7, because a coin with `p=0.7` gives you the highest possible chance of observing that specific result.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Core Question</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"Given the data I've collected, which parameter values for my chosen distribution make my data the most probable outcome?"</blockquote>
                    </div>
                     <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">How it Works</h3>
                        <p className="text-gray-300 leading-relaxed">To find this, we construct a "likelihood function" that calculates this probability for any possible parameter value. The peak of this function is our MLE estimate. Because multiplying many small probabilities is hard, we usually work with the "log-likelihood" (which has the same peak). The chart below shows this function for a sample from a Poisson distribution.</p>
                    </div>
                </>
               )}
               {concept.id === 'pearson-correlation' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">The <strong>Pearson Correlation Coefficient (r)</strong> is a measure of the strength and direction of a <em>linear</em> relationship between two continuous variables. It always produces a value between -1 and 1. It's calculated by dividing the covariance of the two variables by the product of their standard deviations. This normalization is what confines the value to the -1 to 1 range.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Interpreting the Value</h3>
                        <ul className="text-gray-300 space-y-3 leading-relaxed">
                            <li><strong className="text-cyan-400 font-semibold">r = 1:</strong> A perfect positive linear relationship. As one variable increases, the other increases proportionally.</li>
                            <li><strong className="text-cyan-400 font-semibold">r = -1:</strong> A perfect negative linear relationship. As one variable increases, the other decreases proportionally.</li>
                            <li><strong className="text-cyan-400 font-semibold">r = 0:</strong> No linear relationship. The variables might still be related in a non-linear way (e.g., a U-shape)!</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Core Question</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"How well can I predict the value of Y by drawing a straight line through my (X, Y) data points?"</blockquote>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formula</h3>
                        <Formula formula={PearsonFormula} />
                        <div className="bg-gray-800/50 p-6 rounded-lg mt-4">
                            <h5 className="font-semibold text-cyan-400 mb-3 text-lg">Where:</h5>
                            <ul className="list-disc list-inside text-gray-300 space-y-3">
                                <li><code className="font-mono bg-gray-700 p-1 rounded">r<sub>xy</sub></code> is the Pearson correlation coefficient.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">&Sigma;</code> means we sum over all data points.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">x<sub>i</sub>, y<sub>i</sub></code> are the individual paired data points.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">x&#772;</code> and <code className="font-mono bg-gray-700 p-1 rounded">y&#772;</code> are the means of the x and y variables, respectively.</li>
                            </ul>
                        </div>
                    </div>
                </>
                )}
               {concept.id === 'qq-plot' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">A <strong>Quantile-Quantile (Q-Q) plot</strong> is a graphical tool used to determine if a set of data plausibly came from some theoretical distribution, such as a Normal or Exponential distribution. It's a visual check for "goodness-of-fit." The most common use is the <strong>Normal Q-Q Plot</strong>, which checks for normality, a key assumption in many statistical tests.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">How it Works</h3>
                        <ol className="list-decimal list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li><strong>Order the Data:</strong> First, your sample data is sorted from smallest to largest. These are your "sample quantiles."</li>
                            <li><strong>Find Theoretical Quantiles:</strong> For each data point, we calculate where it *should* fall if the data were perfectly from the theoretical distribution (e.g., a perfect Normal distribution).</li>
                            <li><strong>Plot Them:</strong> We create a scatter plot with the theoretical quantiles on the x-axis and the corresponding sample quantiles on the y-axis.</li>
                        </ol>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Interpreting the Plot</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">The interpretation is quite intuitive:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li><strong>Points on the Line:</strong> If the sample data comes from the theoretical distribution, the points on the plot will fall roughly along a straight line.</li>
                            <li><strong>Right Skew:</strong> If the data is right-skewed (like a Gamma distribution), the points will form a curve that is steeper at the beginning and flatter at the end.</li>
                            <li><strong>Light Tails:</strong> If the distribution has lighter tails than a Normal distribution (like a Uniform distribution), the plot will form an 'S' shape.</li>
                        </ul>
                        <p className="mt-4 text-gray-300 leading-relaxed">Use the tool below to generate samples from different distributions and observe how their Q-Q plots deviate from the reference line.</p>
                    </div>
                </>
               )}
               {concept.id === 'linear-regression' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed"><strong>Linear Regression</strong> is a fundamental technique in statistics and machine learning used for predictive modeling. It aims to describe the relationship between a dependent variable (Y), which we want to predict, and one or more independent variables (X) by fitting a straight line to the data.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Core Question</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"Can I create a simple linear equation that best predicts the value of Y, given the value of X?"</blockquote>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Decomposing Variance: SST = SSR + SSE</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">To understand how "good" a regression line is, we start by looking at the total variation in our outcome variable, Y. This variation can be broken down into two parts: the variation that our line explains, and the variation it doesn't (the errors).</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-3 leading-relaxed">
                            <li><strong className="text-cyan-400">SST (Total Sum of Squares):</strong> Measures the total variation of the Y values around their mean. This is the baseline variation we are trying to explain. Formula: <code className="font-mono bg-gray-700 p-1 rounded">&Sigma;(yᵢ - y&#772;)²</code></li>
                            <li><strong className="text-cyan-400">SSR (Regression Sum of Squares):</strong> Measures how much of the total variation is *explained* by our regression line. It's the variation of the predicted values around the mean. Formula: <code className="font-mono bg-gray-700 p-1 rounded">&Sigma;(y&#770;ᵢ - y&#772;)²</code></li>
                            <li><strong className="text-cyan-400">SSE (Sum of Squared Errors):</strong> Measures the variation *unexplained* by our line—the sum of the squared residuals. This is the quantity that OLS minimizes. Formula: <code className="font-mono bg-gray-700 p-1 rounded">&Sigma;(yᵢ - y&#770;ᵢ)²</code></li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">How it Works: Ordinary Least Squares (OLS)</h3>
                         <p className="text-gray-300 leading-relaxed mb-3">The most common method to find the "best" line is called <strong>Ordinary Least Squares (OLS)</strong>. The goal is to minimize the Sum of Squared Errors (SSE), which is the total squared vertical distance between the actual data points and the line we draw. Using calculus, we can find the exact values for the intercept (a) and slope (b) that achieve this minimum SSE.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                         <h3 className="text-xl font-bold text-cyan-400 mb-3">Key Assumptions</h3>
                         <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li><strong>Linearity:</strong> The relationship between X and Y is linear.</li>
                            <li><strong>Independence:</strong> The errors (residuals) are independent of each other.</li>
                            <li><strong>Normality:</strong> The errors are normally distributed with a mean of zero.</li>
                            <li><strong>Homoscedasticity (Constant Variance):</strong> The errors have the same variance across all levels of X. This means the spread of residuals should be roughly the same for small X values and large X values (no fan shape).</li>
                         </ul>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Addressing Assumption Violations</h3>
                        <p className="text-gray-300 leading-relaxed">A common violation is <strong>heteroscedasticity</strong> (non-constant variance), often visible as a fan or cone shape in the data or residuals. This can sometimes be resolved by applying a transformation to the dependent variable, such as taking the logarithm (log(Y)) or square root (√Y), which can help stabilize the variance.</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formula & Goodness-of-Fit</h3>
                        <Formula formula={LinearRegressionFormula} />
                        <div className="bg-gray-800/50 p-6 rounded-lg mt-4">
                            <h5 className="font-semibold text-cyan-400 mb-3 text-lg">Deconstructing the Formula:</h5>
                            <ul className="list-disc list-inside text-gray-300 space-y-3">
                                <li>The formula describes the true relationship in the population. We estimate it using our sample data to get the prediction equation: <code className="font-mono bg-gray-700 p-1 rounded">y&#770; = a + bx</code>.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">y<sub>i</sub></code> is the actual observed value for the i-th observation.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">&alpha;</code> (alpha) is the true population intercept and <code className="font-mono bg-gray-700 p-1 rounded">&beta;</code> (beta) is the true population slope. We estimate them with <code className="font-mono bg-gray-700 p-1 rounded">a</code> and <code className="font-mono bg-gray-700 p-1 rounded">b</code> from our sample.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">&epsilon;<sub>i</sub></code> (epsilon) is the random error term. This represents the difference between the observed value yᵢ and the true regression line. It captures all the variability in Y that is not explained by X.</li>
                                <li>A key assumption is that this error term <code className="font-mono bg-gray-700 p-1 rounded">&epsilon;</code> is normally distributed with a mean of 0 and a constant variance (&sigma;²). This assumption of constant variance is known as <strong>homoscedasticity</strong>.</li>
                            </ul>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-gray-800/50 p-6 rounded-lg space-y-6">
                                <h5 className="font-semibold text-cyan-400 text-lg">Parameters (from OLS):</h5>
                                <div>
                                    <h6 className="font-semibold text-gray-200 mb-2">Slope (b)</h6>
                                    <div className="font-mono bg-gray-700 p-2 rounded text-center overflow-x-auto whitespace-nowrap">
                                        b = &Sigma;((xᵢ - x&#772;)(yᵢ - y&#772;)) / &Sigma;((xᵢ - x&#772;)²)
                                    </div>
                                    <p className="text-sm text-gray-400 mt-2">Represents the change in the dependent variable (Y) for a one-unit change in the independent variable (X).</p>
                                </div>
                                <div>
                                    <h6 className="font-semibold text-gray-200 mb-2">Intercept (a)</h6>
                                    <div className="font-mono bg-gray-700 p-2 rounded text-center">
                                        a = y&#772; - b * x&#772;
                                    </div>
                                    <p className="text-sm text-gray-400 mt-2">The predicted value of the dependent variable (Y) when the independent variable (X) is zero.</p>
                                </div>
                            </div>
                            <div className="bg-gray-800/50 p-6 rounded-lg space-y-6">
                                <h5 className="font-semibold text-cyan-400 text-lg">Goodness-of-Fit Measures:</h5>
                                <div>
                                    <h6 className="font-semibold text-gray-200 mb-2">R-Squared (R²)</h6>
                                    <div className="font-mono bg-gray-700 p-2 rounded text-center">
                                        1 - SSE/SST
                                    </div>
                                    <p className="text-sm text-gray-400 mt-2">The proportion of total variance in Y that is explained by the model.</p>
                                </div>
                                <div>
                                    <h6 className="font-semibold text-gray-200 mb-2">Mean Squared Error (MSE)</h6>
                                    <div className="font-mono bg-gray-700 p-2 rounded text-center">
                                        SSE / (n - 2)
                                    </div>
                                    <p className="text-sm text-gray-400 mt-2">The variance of the residuals. Its square root is the typical prediction error.</p>
                                </div>
                                <div>
                                    <h6 className="font-semibold text-gray-200 mb-2">F-ratio</h6>
                                    <div className="font-mono bg-gray-700 p-2 rounded text-center">
                                        MSR / MSE
                                    </div>
                                    <p className="text-sm text-gray-400 mt-2">A test for the overall significance of the model. MSR is Mean Squared Regression (SSR/1 for a single predictor).</p>
                                </div>
                                <p className="text-xs text-gray-500 italic leading-relaxed pt-4 border-t border-gray-700/50">
                                    <strong>Note:</strong> In simple linear regression (with one predictor), R² is equal to the square of the Pearson Correlation Coefficient (r) between the predictor and outcome variables. This property does not hold for multiple regression.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Sampling Distribution of the Regression Coefficients</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">Because the intercept (a) and slope (b) are calculated from a random sample of data, they are themselves estimates. If we were to take many different samples, we would get slightly different values for 'a' and 'b' each time. This means the coefficients have their own sampling distribution. The OLS estimators are <strong>unbiased</strong>, meaning that on average, they will equal the true population intercept (α) and slope (β).</p>
                        <p className="text-gray-300 leading-relaxed mb-3">The formulas below describe the mean and standard deviation (also known as the <strong>standard error</strong>) of these sampling distributions. These standard errors are crucial for conducting hypothesis tests (e.g., is the slope significantly different from zero?) and for creating confidence intervals for our coefficients.</p>
                        <Formula formula={SamplingDistributionCoefficientsFormula} />
                        <div className="bg-gray-800/50 p-6 rounded-lg mt-4">
                            <h5 className="font-semibold text-cyan-400 mb-3 text-lg">Where:</h5>
                            <ul className="list-disc list-inside text-gray-300 space-y-3">
                                <li><code className="font-mono bg-gray-700 p-1 rounded">E(&#226;)</code> and <code className="font-mono bg-gray-700 p-1 rounded">E(b&#770;)</code> are the expected values of the intercept and slope estimators, representing their long-run average.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">&sigma;<sub>&#226;</sub></code> and <code className="font-mono bg-gray-700 p-1 rounded">&sigma;<sub>b&#770;</sub></code> are the standard errors of the intercept and slope.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">s<sub>e</sub></code> is the standard error of the residuals, calculated as the square root of MSE: &radic;(SSE / (n-2)).</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">r<sub>a,b</sub></code> is the correlation between the intercept and slope estimators. It shows that our estimates for 'a' and 'b' are not independent.</li>
                            </ul>
                        </div>
                    </div>
                </>
               )}
                {concept.id === 'durbin-watson' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">The <strong>Durbin-Watson (DW) test</strong> is a specific test for detecting <strong>first-order autocorrelation</strong> in the residuals (errors) from a regression analysis. It's a critical diagnostic tool in time series analysis, where the assumption of independent errors is often violated. A positive autocorrelation (where a positive error is likely followed by another positive error) is a common problem.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Core Question</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"Are the errors from my regression model independent (H₀), or is there a pattern where one error predicts the next (H₁: autocorrelation)?"</blockquote>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">How it Works & Interpretation</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">The test calculates a statistic, <strong>d</strong>, which always falls between 0 and 4.</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li><strong>d ≈ 2:</strong> No evidence of autocorrelation.</li>
                            <li><strong>d &lt; 2 (approaching 0):</strong> Evidence of positive autocorrelation.</li>
                            <li><strong>d &gt; 2 (approaching 4):</strong> Evidence of negative autocorrelation.</li>
                        </ul>
                         <p className="text-gray-300 leading-relaxed mt-3">Unlike other tests, the DW test has a unique feature: an <strong>inconclusive region</strong>. The decision is based on comparing 'd' to two critical values: a lower bound (d<sub>L</sub>) and an upper bound (d<sub>U</sub>).</p>
                         <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed mt-3">
                            <li>If <strong>d &lt; d<sub>L</sub></strong>, you reject H₀ and conclude there is positive autocorrelation.</li>
                            <li>If <strong>d &gt; d<sub>U</sub></strong>, you fail to reject H₀.</li>
                            <li>If <strong>d<sub>L</sub> ≤ d ≤ d<sub>U</sub></strong>, the test is inconclusive.</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                         <h3 className="text-xl font-bold text-cyan-400 mb-3">Key Assumptions</h3>
                         <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li>The regression model must include an intercept term.</li>
                            <li>The errors are assumed to be normally distributed and follow a first-order autoregressive scheme: e<sub>t</sub> = ρe<sub>t-1</sub> + v<sub>t</sub>.</li>
                            <li>The independent variables (X) are non-stochastic (fixed in repeated sampling).</li>
                            <li>The test is not valid if the regression includes lagged dependent variables (e.g., predicting Y<sub>t</sub> using Y<sub>t-1</sub>).</li>
                         </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formula</h3>
                        <Formula formula={DurbinWatsonFormula} />
                        <div className="bg-gray-800/50 p-6 rounded-lg mt-4">
                            <h5 className="font-semibold text-cyan-400 mb-3 text-lg">Where:</h5>
                            <ul className="list-disc list-inside text-gray-300 space-y-3">
                                <li><code className="font-mono bg-gray-700 p-1 rounded">d</code> is the Durbin-Watson statistic.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">e<sub>t</sub></code> is the residual from the regression at time t.</li>
                            </ul>
                        </div>
                    </div>
                </>
                )}
               {concept.id === 'stationarity' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed"><strong>Stationarity</strong> is a fundamental concept in time series analysis. A time series is stationary if its statistical properties—primarily its mean, variance, and autocorrelation structure—are constant over time. In essence, a stationary series is one whose behavior does not change over the long run, making it easier to model and predict.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Why is it Important?</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"If the rules of the game are changing over time, it's hard to predict the next move. Stationarity implies the rules are stable."</blockquote>
                        <p className="text-gray-300 leading-relaxed mt-3">Many time series forecasting models, like ARIMA, assume that the data is stationary. If a series is not stationary, we often need to transform it (e.g., by differencing) to make it stationary before we can apply these models. A non-stationary series can lead to spurious correlations and unreliable forecasts.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Types of Non-Stationarity</h3>
                         <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li><strong>Trend:</strong> The mean changes over time (e.g., stock prices generally increasing).</li>
                            <li><strong>Seasonality:</strong> The series exhibits regular, predictable patterns (e.g., ice cream sales peaking in summer).</li>
                            <li><strong>Heteroscedasticity:</strong> The variance of the series changes over time (e.g., financial data becoming more volatile during a crisis).</li>
                         </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formal Definitions</h3>
                        <Formula formula={StationarityDefinitions} />
                    </div>
                </>
               )}
               {concept.id === 'markov-chains' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">A <strong>First-Order Markov Chain</strong> is a mathematical model for a system that moves between a set of 'states'. The key idea is the <strong>Markov Property</strong>: the future state of the system depends *only* on its current state, not on the sequence of events that preceded it. It is "memoryless." For example, if we model the weather, this property means that the chance of it raining tomorrow only depends on whether it's raining today, not on whether it rained all of last week.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Core Question</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"Given the state of the system right now, what's the probability of it being in any other state at the next step?"</blockquote>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Key Concepts</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li><strong>States:</strong> A finite set of possible conditions for the system (e.g., State 0: No Precipitation, State 1: Precipitation).</li>
                            <li><strong>Transitions:</strong> The movement from one state to another (or back to itself) in a single time step.</li>
                            <li><strong>Transition Probability:</strong> The probability of moving from state 'i' to state 'j', denoted P(j|i) or pᵢⱼ. The sum of probabilities of transitions out of any state must equal 1.</li>
                            <li><strong>Transition Matrix:</strong> A square matrix that organizes all transition probabilities, where the entry in the i-th row and j-th column is pᵢⱼ.</li>
                            <li><strong>Steady-State Distribution:</strong> Over many time steps, the probability of being in any given state often converges to a fixed value, regardless of the starting state. This is the long-run behavior of the system.</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Testing Markov Chain Properties (with χ²)</h3>
                        <p className="text-gray-300 leading-relaxed">While this visualization focuses on first-order chains, you can use statistical tests to validate a Markov chain's properties on real data. A <strong>Chi-Square (χ²) test</strong> is often used for this. For example, you can use it to test:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed mt-3">
                            <li><strong>Order of the Chain:</strong> Is the chain actually first-order? You could test the null hypothesis that it's first-order against an alternative that it's second-order (i.e., the next state depends on the previous two states). This involves comparing transition counts in contingency tables.</li>
                            <li><strong>Stationarity of Transitions:</strong> Are the transition probabilities constant over time? You could split your data into different time segments, calculate transition matrices for each, and use a χ² test to see if they are significantly different.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Formula</h3>
                        <Formula formula={MarkovChainFormula} />
                    </div>
                    <div className="mt-8">
                        <h3 className="text-3xl font-bold text-white mb-4 border-b-2 border-gray-700 pb-2">Generalizing Markov Chains</h3>
                        <div className="space-y-6">
                            <div className="bg-gray-800/50 p-6 rounded-lg">
                                <h3 className="text-xl font-bold text-cyan-400 mb-3">Extending to s-States and m-Orders</h3>
                                <p className="text-gray-300 leading-relaxed mb-4">The interactive model above uses a simple 2-state, first-order chain. However, Markov chains can be generalized to model more complex systems:</p>
                                <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                                    <li><strong>s-States:</strong> A system can have any number of states (s &gt; 2). For example, a three-state model for weather could be 'Sunny', 'Cloudy', and 'Rainy', with transition probabilities between all three states.</li>
                                    <li><strong>m-Orders:</strong> The Markov property can be extended so that the next state depends on the previous 'm' states. A second-order (m=2) chain's next state depends on the current and the immediately preceding state. This gives the model more 'memory'.</li>
                                </ul>
                                <p className="text-gray-300 leading-relaxed mt-4">Estimating transition probabilities involves counting occurrences in the data. The formulas below show how this is done for first and second-order chains.</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Estimation Formulas</h3>
                                <Formula formula={GeneralMarkovFormulas} />
                            </div>
                            <div className="bg-gray-800/50 p-6 rounded-lg">
                                <h3 className="text-xl font-bold text-cyan-400 mb-3">Identifying the Most Appropriate Order</h3>
                                <p className="text-gray-300 leading-relaxed">How do we decide the right order 'm' for our model? A higher order captures more complexity but risks overfitting the data (modeling noise instead of the true pattern). A lower order is simpler but may miss important dependencies. To balance this trade-off, we can use information criteria like:</p>
                                <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed mt-3">
                                    <li><strong>Akaike Information Criterion (AIC):</strong> Penalizes models for having more parameters.</li>
                                    <li><strong>Bayesian Information Criterion (BIC):</strong> Similar to AIC, but with a stronger penalty for more parameters, especially with larger datasets.</li>
                                </ul>
                                <p className="text-gray-300 leading-relaxed mt-4">For both, we calculate the value for different orders (m=1, 2, 3...) and choose the model with the <strong>lowest</strong> AIC or BIC value.</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Model Selection Formulas</h3>
                                <Formula formula={ModelSelectionFormulas} />
                            </div>
                        </div>
                    </div>
                </>
               )}
               {concept.id === 'ar1-model' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What is it?</h3>
                        <p className="text-gray-300 leading-relaxed">The <strong>Autoregressive (AR) model</strong> is a fundamental tool for understanding and forecasting time series data. The name "auto-regressive" means it's a regression of the variable against itself. The simplest version, <strong>AR(1)</strong>, proposes that the next value in a series depends linearly on its immediately preceding value, plus an unpredictable shock. Think of it like a person's mood: their mood tomorrow is likely related to their mood today, plus any new events that happen.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Core Question</h3>
                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 text-lg">"How much does the value of my series at one point in time depend on its value at the immediately preceding point?"</blockquote>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">The Model Formula Explained</h3>
                        <Formula formula={AR1ModelFormula} />
                        <div className="bg-gray-800/50 p-6 rounded-lg mt-4">
                            <h5 className="font-semibold text-cyan-400 mb-3 text-lg">Deconstructing the Symbols:</h5>
                            <ul className="list-disc list-inside text-gray-300 space-y-3">
                                <li><code className="font-mono bg-gray-700 p-1 rounded">x<sub>t</sub></code> is the value of the series at time <strong>t</strong>.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">&mu; (mu)</code> is the theoretical <strong>mean</strong> of the series. The model describes fluctuations of the series around this long-term average.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">&phi; (phi)</code> is the <strong>autoregressive parameter</strong>. This is the most critical part of the model, measuring the strength and direction of the relationship between consecutive values.</li>
                                <li><code className="font-mono bg-gray-700 p-1 rounded">&epsilon;<sub>t+1</sub> (epsilon)</code> is the <strong>random shock</strong> or "white noise" error at time t+1. It's a random value from a Normal distribution with a mean of 0 and a constant variance, &sigma;<sub>&epsilon;</sub><sup>2</sup>. It represents the new, unpredictable information that arrives at each step.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Heart of the Model: The φ Parameter</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">The behavior of the AR(1) series is almost entirely dictated by the value of <strong>φ</strong>. It's often called the "persistence" or "memory" parameter. In the interactive chart, try changing φ and observe the effects:</p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li><strong>φ &gt; 0 (and &lt; 1):</strong> Positive autocorrelation. A value above the mean is likely to be followed by another value above the mean. The closer φ is to 1, the slower the series returns to its mean after a shock (stronger memory).</li>
                            <li><strong>φ &lt; 0:</strong> Negative autocorrelation. A value above the mean is likely to be followed by a value below the mean. The series tends to oscillate around its mean.</li>
                            <li><strong>φ = 0:</strong> No autocorrelation. The series is just random noise around the mean, as <code className="font-mono bg-gray-700 p-1 rounded">x<sub>t+1</sub> = &mu; + &epsilon;<sub>t+1</sub></code>.</li>
                        </ul>
                    </div>
                    
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Crucial Stationarity Condition: |φ| &lt; 1</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">For an AR(1) model to be useful for forecasting, it must be <strong>stationary</strong>, meaning its statistical properties don't change over time. This only happens when the absolute value of φ is less than 1.</p>
                         <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                            <li><strong>|φ| &lt; 1 (Stationary):</strong> The effects of a random shock (ε) are temporary and eventually die out. The series will always revert back towards its long-term mean μ.</li>
                            <li><strong>φ = 1 (Non-Stationary "Random Walk"):</strong> The effects of a random shock are permanent. The series has no long-term mean and its variance grows infinitely over time. Think of a stock price; today's price is yesterday's price plus a random step.</li>
                            <li><strong>|φ| &gt; 1 (Non-Stationary "Explosive"):</strong> The series will diverge to positive or negative infinity. This is rarely seen in real-world data.</li>
                        </ul>
                    </div>

                     <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Key Properties & Formulas</h3>
                        <Formula formula={AR1PropertiesFormulas} />
                        <div className="bg-gray-800/50 p-6 rounded-lg mt-4">
                            <h5 className="font-semibold text-cyan-400 mb-3 text-lg">Understanding the Properties:</h5>
                            <dl className="space-y-4">
                                <div>
                                    <dt className="font-semibold text-gray-200">Markov Property:</dt>
                                    <dd className="text-gray-300 leading-relaxed pl-4">This simply means the future is only dependent on the present, not the past. To predict x<sub>t+1</sub>, all we need is the value of x<sub>t</sub>.</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold text-gray-200">Process Variance (σ²ₓ):</dt>
                                    <dd className="text-gray-300 leading-relaxed pl-4">This formula is vital. It shows how the overall variance of the series (σ²ₓ) relates to the variance of the random shocks (σ²_ε) and the AR parameter (φ). Notice that as |φ| approaches 1, the denominator (1 - φ²) approaches zero, causing the process variance to explode to infinity. This is the mathematical reason why |φ| must be less than 1 for stationarity.</dd>
                                </div>
                                <div>
                                    <dt className="font-semibold text-gray-200">Autocorrelation (ρₖ):</dt>
                                    <dd className="text-gray-300 leading-relaxed pl-4">This shows that the correlation between observations that are 'k' steps apart is φ<sup>k</sup>. This is a signature feature of an AR(1) process: the correlation dies off exponentially as the lag 'k' increases.</dd>
                                </div>
                                 <div>
                                    <dt className="font-semibold text-gray-200">Parameter Estimation:</dt>
                                    <dd className="text-gray-300 leading-relaxed pl-4">To use the model, we estimate its parameters from a sample. We use the sample mean (x̄) for μ and the <strong>lag-1 sample autocorrelation (r₁)</strong> for φ. The test for H₀: φ=0 helps us determine if the autocorrelation is statistically significant or just random noise. The standard error of φ is approximately 1/√n, so for large samples, we can reject the null if |r₁| &gt; 1.96/√n.</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </>
               )}
               {concept.id === 'robust-measures' && (
                <>
                    <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">What does "Robust" Mean?</h3>
                        <p className="text-gray-300 leading-relaxed">In statistics, a measure is considered <strong>robust</strong> or <strong>resistant</strong> if it is not heavily influenced by a few extreme observations, or outliers. When summarizing data, it's crucial to know if your chosen statistics are telling the true story of the data's center and spread, or if they are being skewed by unusual values.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-800/50 p-6 rounded-lg">
                            <h4 className="font-semibold text-cyan-400 text-lg mb-3">Non-Robust Measures</h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                                <li><strong>Mean:</strong> The average is famously sensitive to outliers. One huge value can pull the mean way up.</li>
                                <li><strong>Standard Deviation:</strong> Since it's based on squared distances from the mean, it's even more sensitive to outliers than the mean.</li>
                            </ul>
                        </div>
                        <div className="bg-gray-800/50 p-6 rounded-lg">
                            <h4 className="font-semibold text-pink-400 text-lg mb-3">Robust Measures</h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                                <li><strong>Median:</strong> The middle value. It completely ignores what the most extreme values are.</li>
                                <li><strong>IQR (Interquartile Range):</strong> The range of the middle 50% of the data. It's not affected by the top or bottom 25% of data.</li>
                                <li><strong>Trimean:</strong> A weighted average of the quartiles, giving more weight to the median. It provides a more stable measure of center.</li>
                            </ul>
                        </div>
                    </div>
                     <div className="bg-gray-800/50 p-6 rounded-lg">
                        <p className="text-gray-300 leading-relaxed">The interactive chart below demonstrates this concept. As you move the outlier, watch how much the non-robust measures (like the mean) change compared to the robust ones (like the median).</p>
                    </div>
                </>
                )}
            </section>
            <section>
                <h3 className="text-2xl font-bold text-white mb-4">Interactive Visualization</h3>
                <concept.InteractiveComponent />
            </section>
        </div>
    );
};

export default ConceptDetail;
