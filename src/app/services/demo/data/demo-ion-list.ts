// src/app/services/demo/data/demo-ion-list.ts

import { DemoComponent } from '@app/models/demo.model';

export const DEMO_ION_LIST: DemoComponent = {
  id: 'ion-list',
  name: 'IonList',
  description: 'List container with various item styles',
  category: 'list',
  icon: 'list',
  defaultProps: {
    inset: false,
    lines: 'full',
    itemCount: 3,
  },
  propDefinitions: [
    {
      name: 'inset',
      label: 'Inset',
      type: 'boolean',
      defaultValue: false,
      description: 'Add margin around list',
    },
    {
      name: 'lines',
      label: 'Lines',
      type: 'select',
      options: [
        { value: 'full', label: 'Full' },
        { value: 'inset', label: 'Inset' },
        { value: 'none', label: 'None' },
      ],
      defaultValue: 'full',
      description: 'Border line style',
    },
    {
      name: 'itemCount',
      label: 'Item Count',
      type: 'number',
      defaultValue: 3,
      description: 'Number of list items (1-5)',
    },
  ],
  templateGenerator: (props) => {
    const inset = props['inset'] ? ' inset="true"' : '';
    const lines = props['lines'] !== 'full' ? ` lines="${props['lines']}"` : '';
    const count = Math.min(Math.max(props['itemCount'] || 3, 1), 5);

    const items = Array.from({ length: count }, (_, i) =>
      `  <ion-item>
    <ion-label>List Item ${i + 1}</ion-label>
  </ion-item>`
    ).join('\n');

    return `<ion-list${inset}${lines}>
${items}
</ion-list>`;
  },
  typescriptGenerator: (props) => {
    const count = Math.min(Math.max(props['itemCount'] || 3, 1), 5);
    const items = Array.from({ length: count }, (_, i) =>
      `    <ion-item>
      <ion-label>List Item ${i + 1}</ion-label>
    </ion-item>`
    ).join('\n');

    return `import { Component } from '@angular/core';
import { IonList, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-example',
  template: \`
    <ion-list${props['inset'] ? ' inset="true"' : ''}${props['lines'] !== 'full' ? ` lines="${props['lines']}"` : ''}>
${items}
    </ion-list>
  \`,
  standalone: true,
  imports: [IonList, IonItem, IonLabel],
})
export class ExampleComponent {}`;
  },
};
