
import React from 'react';

const HypothesisFrameworkChart: React.FC = () => {
    // This is a static, explanatory component.
    const steps = [
        {
            title: "1. State the Hypotheses (H₀ and H₁)",
            content: "First, you frame your question. The Null Hypothesis (H₀) is the 'default' or 'no effect' scenario (e.g., 'this new drug has no effect'). The Alternative Hypothesis (H₁) is what you're trying to prove (e.g., 'the drug lowers blood pressure')."
        },
        {
            title: "2. Choose a Test Statistic",
            content: "Next, you choose a mathematical tool. A test statistic is a single number that summarizes your sample data. Different tests (like t-test or chi-square test) use different formulas to calculate this number, tailored to the type of data you have."
        },
        {
            title: "3. Determine the Null Distribution",
            content: "This is a crucial step. You figure out what the test statistic's probability distribution would look like *if the null hypothesis were true*. This 'null distribution' shows you the range of statistic values you'd expect to see just from random chance."
        },
        {
            title: "4. Calculate the Statistic and P-value",
            content: "Now you collect your data and calculate the test statistic. Then you compare it to the null distribution to get a p-value. The p-value is the probability of seeing a test statistic as extreme as yours (or more extreme) if H₀ is true."
        },
        {
            title: "5. Make a Conclusion",
            content: "Finally, you decide. You pick a significance level (α, usually 0.05) beforehand. If your p-value is less than α, your result is 'statistically significant.' You reject the null hypothesis (H₀) in favor of the alternative (H₁). Otherwise, you 'fail to reject' H₀."
        }
    ];

    return (
        <div className="space-y-6">
            {steps.map((step, index) => (
                <div key={index} className="bg-gray-800/50 p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-bold text-cyan-400 mb-2">{step.title}</h4>
                    <p className="text-gray-300 leading-relaxed">{step.content}</p>
                </div>
            ))}
        </div>
    );
};

export default HypothesisFrameworkChart;
