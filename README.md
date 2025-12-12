# Environmental Data Analysis

An interactive educational tool designed to build intuition for statistical concepts and probability distributions commonly used in environmental sciences, hydrology, and climatology. Based on lectures from CEE 548 Advanced Environment Analysis by Prof. Giuseppe Mascaro at Arizona State University.

This application bridges the gap between abstract mathematical formulas and visual understanding, allowing users to manipulate parameters and see real-time changes in distributions and statistical tests.

## 🌐 Live Application

Visit the live application: [https://geokshitij.github.io/Stats/](https://geokshitij.github.io/Stats/)

## Features

### Probability Distributions
Explore the behavior of distributions critical to environmental modeling:
*   **Extremes:** Generalized Extreme Value (GEV), Generalized Pareto (GP).
*   **Discrete:** Poisson, Binomial, Negative Binomial.
*   **Continuous:** Gaussian (Normal), Gamma.
*   **Interactive Visuals:** Toggle between PDF/PMF, CDF, and Q-Q Plots.

### Statistical Concepts
Interactive modules to visualize core statistical theories:
*   **Hypothesis Testing:** T-Tests, Z-Tests, ANOVA, and Type I/II Errors.
*   **Non-Parametric Tests:** Mann-Kendall (Trend), Mann-Whitney U, Wilcoxon Signed-Rank.
*   **Time Series:** Autocorrelation (ACF), Stationarity, AR(1) processes.
*   **Model Fitting:** Maximum Likelihood Estimation (MLE), Method of Moments (MoM).

## Tech Stack
*   **Framework:** React 19 + Vite
*   **Language:** TypeScript
*   **Visualization:** Recharts
*   **Styling:** Tailwind CSS

## Run Locally

**Prerequisites:**  
*   Node.js (v18 or higher recommended)
*   npm

**1. Clone the repository:**
```bash
git clone https://github.com/geokshitij/Stats.git
cd Stats
```

**2. Install dependencies:**
```bash
npm install
```

**3. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key**

**4. Run the app:**
```bash
npm run dev
```

## 🤝 How to Contribute

We welcome contributions to improve this educational tool! Here's how you can help:

### Adding New Statistical Distributions

1. **Create the distribution data** in `data/distributions.ts`:
   - Add mathematical functions (PDF, CDF, etc.)
   - Include parameter definitions and constraints
   - Provide real-world examples and use cases
   - Add summary description

2. **Create interactive visualization** in `components/DistributionChart.tsx`:
   - Implement parameter controls
   - Add probability density/mass function plots
   - Include cumulative distribution function
   - Show statistical measures (mean, variance, etc.)

### Adding New Statistical Concepts

1. **Define the concept** in `data/concepts.ts`:
   - Add concept metadata (name, summary, category)
   - Assign to appropriate category (Core Concepts, Parametric Tests, etc.)

2. **Create interactive component** in `components/concepts/`:
   - Build educational visualization
   - Include step-by-step explanations
   - Add interactive examples
   - Provide practical applications

### Adding New Features

- **Interactive calculators** for statistical tests
- **Data import/export** functionality
- **Additional visualization types** (Q-Q plots, residual plots, etc.)
- **Mobile responsiveness** improvements
- **Accessibility** enhancements

### Content Improvements

- **Mathematical accuracy** verification
- **Educational explanations** enhancement
- **Real-world examples** from environmental science
- **Code documentation** and comments

### Getting Started with Contributions

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-distribution`
3. Make your changes following the existing patterns
4. Test locally: `npm run dev`
5. Commit with descriptive messages
6. Push and create a Pull Request

### Code Structure

```
├── components/
│   ├── concepts/          # Individual concept visualizations
│   ├── interactive/       # Reusable interactive components
│   ├── pages/            # Main page components
│   └── ui/               # UI components
├── data/
│   ├── concepts.ts       # Statistical concepts definitions
│   └── distributions.ts  # Distribution definitions and math
├── utils/
│   └── math.ts          # Mathematical utility functions
└── types.ts             # TypeScript type definitions
```

### Questions or Ideas?

Feel free to:
- Open an issue for bugs or feature requests
- Start a discussion for ideas or questions
- Email corrections to: geokshitij@gmail.com

Let's make environmental data analysis more accessible and intuitive for everyone! 🌱📊