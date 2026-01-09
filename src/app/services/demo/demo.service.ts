import { Injectable } from '@angular/core';
import { DemoComponent, DemoCategory } from '@app/models/demo.model';
import { DEMO_COMPONENTS, CHAPTER_DEMO_MAP } from './demo.constants';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  private readonly demoComponents: DemoComponent[] = DEMO_COMPONENTS;

  constructor() {}

  getDemosByChapterId(chapterId: number): DemoComponent[] {
    const demoIds = CHAPTER_DEMO_MAP[chapterId] || [];
    return this.demoComponents.filter(demo => demoIds.includes(demo.id));
  }

  getAllDemos(): DemoComponent[] {
    return this.demoComponents;
  }

  getDemoById(id: string): DemoComponent | undefined {
    return this.demoComponents.find(demo => demo.id === id);
  }

  getDemoCategories(): DemoCategory[] {
    const categories: DemoCategory[] = [
      {
        id: 'button',
        name: 'Buttons',
        description: 'Interactive button components',
        components: this.demoComponents.filter(d => d.category === 'button'),
      },
      {
        id: 'input',
        name: 'Inputs',
        description: 'Form input components',
        components: this.demoComponents.filter(d => d.category === 'input'),
      },
      {
        id: 'card',
        name: 'Cards',
        description: 'Content container components',
        components: this.demoComponents.filter(d => d.category === 'card'),
      },
      {
        id: 'list',
        name: 'Lists',
        description: 'List and item components',
        components: this.demoComponents.filter(d => d.category === 'list'),
      },
      {
        id: 'toggle',
        name: 'Toggles',
        description: 'Toggle and checkbox components',
        components: this.demoComponents.filter(d => d.category === 'toggle'),
      },
    ];

    return categories.filter(cat => cat.components.length > 0);
  }
}
