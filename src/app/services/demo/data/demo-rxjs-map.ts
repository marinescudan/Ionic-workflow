// src/app/services/demo/data/demo-rxjs-map.ts

import { DemoComponent } from '@app/models/demo.model';

export const DEMO_RXJS_MAP: DemoComponent = {
  id: 'rxjs-map',
  name: 'map Operator',
  description: 'Transform values with map',
  category: 'display',
  icon: 'git-network',
  defaultProps: {
    inputValue: 5,
    multiplier: 2,
  },
  propDefinitions: [
    {
      name: 'inputValue',
      label: 'Input Value',
      type: 'number',
      defaultValue: 5,
      description: 'Value to transform',
    },
    {
      name: 'multiplier',
      label: 'Multiplier',
      type: 'number',
      defaultValue: 2,
      description: 'Multiply by this number',
    },
  ],
  templateGenerator: (props) => {
    return `<!-- Input value: ${props['inputValue']} -->
<!-- map(x => x * ${props['multiplier']}) -->
<!-- Output: ${props['inputValue'] * props['multiplier']} -->

<div class="rxjs-demo">
  <div class="demo-value input">Input: ${props['inputValue']}</div>
  <div class="demo-operator">map(x => x * ${props['multiplier']})</div>
  <div class="demo-value output">Output: ${props['inputValue'] * props['multiplier']}</div>
</div>

<style>
.rxjs-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  text-align: center;
}
.demo-value {
  padding: 16px;
  border-radius: 8px;
  font-size: 24px;
  font-weight: 600;
}
.demo-value.input {
  background: #e3f2fd;
  color: #1976d2;
}
.demo-value.output {
  background: #c8e6c9;
  color: #388e3c;
}
.demo-operator {
  padding: 12px;
  background: #fff3e0;
  border-radius: 8px;
  font-family: monospace;
  color: #f57c00;
}
</style>`;
  },
  typescriptGenerator: (props) => {
    return `import { Component } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-example',
  template: \`
    <p>Input: {{ input }}</p>
    <p>Output: {{ output }}</p>
  \`
})
export class ExampleComponent {
  input = ${props['inputValue']};
  output = 0;

  ngOnInit() {
    of(this.input).pipe(
      map(x => x * ${props['multiplier']})
    ).subscribe(result => {
      this.output = result;
    });
  }
}`;
  },
};
