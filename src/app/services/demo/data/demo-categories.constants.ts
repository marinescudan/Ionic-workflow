// src/app/services/demo/data/demo-categories.constants.ts
// API-ready constant - demo category definitions

/**
 * Base category definition without computed components
 * Components are added at runtime by DemoService
 */
export interface DemoCategoryDefinition {
  id: string;
  name: string;
  description: string;
}

/**
 * Demo category definitions
 * Note: The 'components' field is computed at runtime based on
 * which demo components have matching category IDs
 */
export const DEMO_CATEGORY_DEFINITIONS: DemoCategoryDefinition[] = [
  {
    id: 'button',
    name: 'Buttons',
    description: 'Interactive button components',
  },
  {
    id: 'input',
    name: 'Inputs',
    description: 'Form input components',
  },
  {
    id: 'card',
    name: 'Cards',
    description: 'Content container components',
  },
  {
    id: 'list',
    name: 'Lists',
    description: 'List and item components',
  },
  {
    id: 'toggle',
    name: 'Toggles',
    description: 'Toggle and checkbox components',
  },
  {
    id: 'display',
    name: 'Display',
    description: 'Data visualization components',
  },
];
