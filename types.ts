// Fix: Add React import for React.ReactNode and React.FC types.
import React from 'react';

export interface Parameter {
  id: string;
  name: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  explanation?: string[];
}

export interface Distribution {
  id:string;
  name: string;
  formula: React.ReactNode;
  explanation: string;
  conditions: string[];
  dataGenerator: (...args: number[]) => { [key: string]: number | string }[];
  cdfGenerator: (...args: number[]) => { x: number; cdf: number }[];
  randomVariate: (...args: number[]) => number; // Generates a single random number from the distribution
  parameters: Parameter[];
  graphType: 'bar' | 'line';
  xAxisKey: string;
  yAxisKey: string;
  xAxisLabel: string;
  yAxisLabel: string;
  summary: string;
  realWorldExamples: string[];
  keyTakeaways: string[];
}

export interface StatisticalConcept {
  id: string;
  name: string;
  summary: string;
  InteractiveComponent: React.FC;
  category: 'Core Concepts' | 'Parametric Tests' | 'Nonparametric Tests' | 'Forecasting & Modeling';
}