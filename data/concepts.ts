
import { StatisticalConcept } from '../types';
import ChiSquareChart from '../components/concepts/ChiSquareChart';
import HypothesisFrameworkChart from '../components/concepts/HypothesisFrameworkChart';
import MLEChart from '../components/concepts/MLEChart';
import MoMChart from '../components/concepts/MoMChart';
import PValueChart from '../components/concepts/PValueChart';
import TTestChart from '../components/concepts/TTestChart';
import TypeErrorsChart from '../components/concepts/TypeErrorsChart';
import ZTestChart from '../components/concepts/ZTestChart';
import PearsonCorrelationChart from '../components/concepts/PearsonCorrelationChart';
import RobustMeasuresChart from '../components/concepts/RobustMeasuresChart';
import KolmogorovSmirnovChart from '../components/concepts/KolmogorovSmirnovChart';
import LikelihoodRatioChart from '../components/concepts/LikelihoodRatioChart';
import MannWhitneyChart from '../components/concepts/MannWhitneyChart';
import WilcoxonSignedRankChart from '../components/concepts/WilcoxonSignedRankChart';
import MannKendallChart from '../components/concepts/MannKendallChart';
import LillieforsTestChart from '../components/concepts/LillieforsTestChart';
import LinearRegressionChart from '../components/concepts/LinearRegressionChart';
import DurbinWatsonChart from '../components/concepts/DurbinWatsonChart';
import StationarityChart from '../components/concepts/StationarityChart';
import MarkovChainChart from '../components/concepts/MarkovChainChart';
import AR1Chart from '../components/concepts/AR1Chart';
import ACFChart from '../components/concepts/ACFChart';
import FDistributionChart from '../components/concepts/FDistributionChart';
import ANOVAChart from '../components/concepts/ANOVAChart';
import QQPlotConceptChart from '../components/concepts/QQPlotConceptChart';
import StatisticsVsProbabilityChart from '../components/concepts/StatisticsVsProbabilityChart';

export const statisticalConcepts: StatisticalConcept[] = [
    {
        id: 'stats-vs-prob',
        name: 'Statistics vs. Probability',
        summary: 'The fundamental difference between predicting data from a model and inferring a model from data.',
        InteractiveComponent: StatisticsVsProbabilityChart,
        category: 'Core Concepts',
    },
    {
        id: 'hypothesis-testing',
        name: 'Hypothesis Testing Framework',
        summary: 'The 5-step logical process used to test claims and make decisions with data.',
        InteractiveComponent: HypothesisFrameworkChart,
        category: 'Core Concepts',
    },
    {
        id: 'type-errors',
        name: 'Type I & II Errors',
        summary: 'The fundamental trade-off in hypothesis testing between false positives and false negatives.',
        InteractiveComponent: TypeErrorsChart,
        category: 'Core Concepts',
    },
    {
        id: 'p-value',
        name: 'P-value',
        summary: 'The probability of observing your data, or something more extreme, if the null hypothesis is true.',
        InteractiveComponent: PValueChart,
        category: 'Core Concepts',
    },
    {
        id: 'robust-measures',
        name: 'Robust Summary Measures',
        summary: 'Explore statistics that resist the influence of outliers (e.g., Median, IQR).',
        InteractiveComponent: RobustMeasuresChart,
        category: 'Core Concepts',
    },
    {
        id: 'mom',
        name: 'Method of Moments (MoM)',
        summary: 'An intuitive method to estimate parameters by matching sample moments to theoretical moments.',
        InteractiveComponent: MoMChart,
        category: 'Core Concepts',
    },
    {
        id: 'mle',
        name: 'Maximum Likelihood (MLE)',
        summary: 'A powerful method that finds parameter values that best explain the observed data.',
        InteractiveComponent: MLEChart,
        category: 'Core Concepts',
    },
    {
        id: 'pearson-correlation',
        name: 'Pearson Correlation',
        summary: 'Measures the linear relationship between two continuous variables.',
        InteractiveComponent: PearsonCorrelationChart,
        category: 'Core Concepts',
    },
    {
        id: 'qq-plot',
        name: 'Q-Q Plot',
        summary: 'A graphical tool to check if a dataset follows a particular distribution (usually Normal).',
        InteractiveComponent: QQPlotConceptChart,
        category: 'Core Concepts',
    },
    {
        id: 'z-test',
        name: 'Z-Test',
        summary: 'Tests if a sample mean differs from a known population mean (when population variance is known).',
        InteractiveComponent: ZTestChart,
        category: 'Parametric Tests',
    },
    {
        id: 't-test',
        name: 'Student\'s t-Test',
        summary: 'A common test to determine if there is a significant difference between the means of two groups.',
        InteractiveComponent: TTestChart,
        category: 'Parametric Tests',
    },
     {
        id: 'chi-square-test',
        name: 'Chi-Square (χ²) Test',
        summary: 'Tests if there is a significant association between two categorical variables.',
        InteractiveComponent: ChiSquareChart,
        category: 'Parametric Tests',
    },
    {
        id: 'anova',
        name: 'ANOVA',
        summary: 'Tests for significant differences between the means of 3 or more groups.',
        InteractiveComponent: ANOVAChart,
        category: 'Parametric Tests',
    },
    {
        id: 'f-distribution',
        name: 'F-Distribution',
        summary: 'Compares variances between two samples or is the null distribution for ANOVA.',
        InteractiveComponent: FDistributionChart,
        category: 'Parametric Tests',
    },
    {
        id: 'ks-test',
        name: 'Kolmogorov-Smirnov Test',
        summary: 'A goodness-of-fit test that checks if a sample comes from a specific distribution.',
        InteractiveComponent: KolmogorovSmirnovChart,
        category: 'Parametric Tests',
    },
    {
        id: 'lilliefors-test',
        name: 'Lilliefors Test',
        summary: 'A modification of the K-S test used to check for normality when population mean and variance are unknown.',
        InteractiveComponent: LillieforsTestChart,
        category: 'Parametric Tests',
    },
    {
        id: 'lr-test',
        name: 'Likelihood Ratio Test',
        summary: 'Compares the fit of two nested statistical models to see which one is better.',
        InteractiveComponent: LikelihoodRatioChart,
        category: 'Parametric Tests',
    },
    {
        id: 'mann-whitney',
        name: 'Mann-Whitney U Test',
        summary: 'A non-parametric test to see if two independent samples come from the same distribution.',
        InteractiveComponent: MannWhitneyChart,
        category: 'Nonparametric Tests',
    },
    {
        id: 'wilcoxon-signed-rank',
        name: 'Wilcoxon Signed-Rank Test',
        summary: 'A non-parametric test for paired data to assess if population means differ.',
        InteractiveComponent: WilcoxonSignedRankChart,
        category: 'Nonparametric Tests',
    },
    {
        id: 'mann-kendall',
        name: 'Mann-Kendall Trend Test',
        summary: 'A non-parametric test to detect a monotonic trend in time series data.',
        InteractiveComponent: MannKendallChart,
        category: 'Nonparametric Tests',
    },
    {
        id: 'acf',
        name: 'Autocorrelation (ACF)',
        summary: 'Measures how correlated a time series is with its own past values at different lags.',
        InteractiveComponent: ACFChart,
        category: 'Forecasting & Modeling',
    },
    {
        id: 'linear-regression',
        name: 'Linear Regression',
        summary: 'Models the linear relationship between two variables to predict an outcome.',
        InteractiveComponent: LinearRegressionChart,
        category: 'Forecasting & Modeling',
    },
    {
        id: 'durbin-watson',
        name: 'Durbin-Watson Test',
        summary: 'Tests for first-order autocorrelation in the residuals of a time series regression.',
        InteractiveComponent: DurbinWatsonChart,
        category: 'Forecasting & Modeling',
    },
    {
        id: 'stationarity',
        name: 'Stationarity',
        summary: 'A key property of time series data where statistical properties are constant over time.',
        InteractiveComponent: StationarityChart,
        category: 'Forecasting & Modeling',
    },
    {
        id: 'markov-chains',
        name: 'Markov Chains',
        summary: 'A model for sequences where the next event depends on prior states. Explore generalizations to multiple states and higher orders.',
        InteractiveComponent: MarkovChainChart,
        category: 'Forecasting & Modeling',
    },
    {
        id: 'ar1-model',
        name: 'Autoregression (AR(1)) Model',
        summary: 'A time series model where the current value depends linearly on its previous value.',
        InteractiveComponent: AR1Chart,
        category: 'Forecasting & Modeling',
    },
];