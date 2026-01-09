import { Injectable } from '@angular/core';
import { DemoComponent, DemoCategory } from '@app/models/demo.model';
import { DEMO_COMPONENTS, CHAPTER_DEMO_MAP } from './demo.constants';
import { DEMO_CATEGORY_DEFINITIONS } from './data/demo-categories.constants';

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
    // Build categories from definitions, computing components at runtime
    const categories: DemoCategory[] = DEMO_CATEGORY_DEFINITIONS.map(def => ({
      ...def,
      components: this.demoComponents.filter(d => d.category === def.id),
    }));

    return categories.filter(cat => cat.components.length > 0);
  }
}
