// src/app/services/rxjs/data/marble-diagrams.constants.ts
// API-ready constant - marble diagram examples for RxJS visualization

import { MarbleStream } from '@app/models/rxjs.model';

/**
 * Marble diagram example definition
 */
export interface MarbleDiagramExample {
  id: string;
  name: string;
  description: string;
  operator: string;
  input: MarbleStream;
  output: MarbleStream;
}

/**
 * Map operator example - doubles each value
 */
export const MARBLE_MAP_EXAMPLE: MarbleDiagramExample = {
  id: 'map-double',
  name: 'Map (Double)',
  description: 'Transform each value by multiplying by 2',
  operator: 'map(x => x * 2)',
  input: {
    id: 'input-map',
    name: 'Input',
    duration: 5000,
    events: [
      { id: '1', value: 1, time: 500, color: '#2196F3', type: 'value' },
      { id: '2', value: 2, time: 1500, color: '#2196F3', type: 'value' },
      { id: '3', value: 3, time: 3000, color: '#2196F3', type: 'value' },
    ],
  },
  output: {
    id: 'output-map',
    name: 'Output',
    duration: 5000,
    events: [
      { id: '1', value: 2, time: 500, color: '#4CAF50', type: 'value' },
      { id: '2', value: 4, time: 1500, color: '#4CAF50', type: 'value' },
      { id: '3', value: 6, time: 3000, color: '#4CAF50', type: 'value' },
    ],
  },
};

/**
 * Filter operator example - only even numbers
 */
export const MARBLE_FILTER_EXAMPLE: MarbleDiagramExample = {
  id: 'filter-even',
  name: 'Filter (Even)',
  description: 'Only emit even numbers',
  operator: 'filter(x => x % 2 === 0)',
  input: {
    id: 'input-filter',
    name: 'Input',
    duration: 5000,
    events: [
      { id: '1', value: 1, time: 500, color: '#2196F3', type: 'value' },
      { id: '2', value: 2, time: 1500, color: '#2196F3', type: 'value' },
      { id: '3', value: 3, time: 2500, color: '#2196F3', type: 'value' },
      { id: '4', value: 4, time: 3500, color: '#2196F3', type: 'value' },
    ],
  },
  output: {
    id: 'output-filter',
    name: 'Output',
    duration: 5000,
    events: [
      { id: '2', value: 2, time: 1500, color: '#4CAF50', type: 'value' },
      { id: '4', value: 4, time: 3500, color: '#4CAF50', type: 'value' },
    ],
  },
};

/**
 * Debounce example - wait for pause in emissions
 */
export const MARBLE_DEBOUNCE_EXAMPLE: MarbleDiagramExample = {
  id: 'debounce',
  name: 'Debounce',
  description: 'Emit only after 500ms pause',
  operator: 'debounceTime(500)',
  input: {
    id: 'input-debounce',
    name: 'Input',
    duration: 5000,
    events: [
      { id: '1', value: 'a', time: 200, color: '#2196F3', type: 'value' },
      { id: '2', value: 'b', time: 400, color: '#2196F3', type: 'value' },
      { id: '3', value: 'c', time: 600, color: '#2196F3', type: 'value' },
      { id: '4', value: 'd', time: 2000, color: '#2196F3', type: 'value' },
    ],
  },
  output: {
    id: 'output-debounce',
    name: 'Output',
    duration: 5000,
    events: [
      { id: '3', value: 'c', time: 1100, color: '#4CAF50', type: 'value' },
      { id: '4', value: 'd', time: 2500, color: '#4CAF50', type: 'value' },
    ],
  },
};

/**
 * All marble diagram examples
 */
export const MARBLE_DIAGRAM_EXAMPLES: MarbleDiagramExample[] = [
  MARBLE_MAP_EXAMPLE,
  MARBLE_FILTER_EXAMPLE,
  MARBLE_DEBOUNCE_EXAMPLE,
];

/**
 * Get example by ID
 */
export function getMarbleExample(id: string): MarbleDiagramExample | undefined {
  return MARBLE_DIAGRAM_EXAMPLES.find(e => e.id === id);
}

/**
 * Get example by operator name
 */
export function getMarbleExampleByOperator(operator: string): MarbleDiagramExample | undefined {
  return MARBLE_DIAGRAM_EXAMPLES.find(e =>
    e.operator.toLowerCase().includes(operator.toLowerCase())
  );
}
