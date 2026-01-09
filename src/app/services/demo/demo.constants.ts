// src/app/services/demo/demo.constants.ts
// Aggregator for demo components data

import { DemoComponent } from '@app/models/demo.model';

// Import individual demo components
import { DEMO_ION_BUTTON } from './data/demo-ion-button';
import { DEMO_ION_CARD } from './data/demo-ion-card';
import { DEMO_ION_LIST } from './data/demo-ion-list';
import { DEMO_ION_INPUT } from './data/demo-ion-input';
import { DEMO_ION_TOGGLE } from './data/demo-ion-toggle';
import { DEMO_RXJS_MAP } from './data/demo-rxjs-map';
import { DEMO_REACTIVE_FORM } from './data/demo-reactive-form';
import { DEMO_FORM_VALIDATION } from './data/demo-form-validation';

/**
 * Maps chapter IDs to their associated demo component IDs
 */
export const CHAPTER_DEMO_MAP: Record<number, string[]> = {
  2: ['ion-button', 'ion-card', 'ion-list'], // Chapter 2: Ionic Components
  5: ['rxjs-map'],                            // Chapter 5: RxJS
  // Chapter 6: Navigation demos handled separately in demo.page.ts
  7: ['reactive-form', 'form-validation'],    // Chapter 7: Forms & Validation
};

/**
 * All demo components with their configurations and generators
 */
export const DEMO_COMPONENTS: DemoComponent[] = [
  // Chapter 2: Ionic Components
  DEMO_ION_BUTTON,
  DEMO_ION_CARD,
  DEMO_ION_LIST,
  DEMO_ION_INPUT,
  DEMO_ION_TOGGLE,
  // Chapter 5: RxJS
  DEMO_RXJS_MAP,
  // Chapter 7: Forms & Validation
  DEMO_REACTIVE_FORM,
  DEMO_FORM_VALIDATION,
];

// Re-export individual demos for direct access if needed
export {
  DEMO_ION_BUTTON,
  DEMO_ION_CARD,
  DEMO_ION_LIST,
  DEMO_ION_INPUT,
  DEMO_ION_TOGGLE,
  DEMO_RXJS_MAP,
  DEMO_REACTIVE_FORM,
  DEMO_FORM_VALIDATION,
};
