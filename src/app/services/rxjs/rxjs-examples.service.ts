import { Injectable } from '@angular/core';
import { RxJSPattern } from '@app/models/rxjs.model';
import { RXJS_PATTERNS } from './data/rxjs-patterns.constants';

@Injectable({
  providedIn: 'root',
})
export class RxjsExamplesService {
  private patterns: RxJSPattern[] = RXJS_PATTERNS;

  constructor() {}

  getAllPatterns(): RxJSPattern[] {
    return this.patterns;
  }

  getPatternById(id: string): RxJSPattern | undefined {
    return this.patterns.find(p => p.id === id);
  }

  getPatternsByUseCase(useCase: string): RxJSPattern[] {
    return this.patterns.filter(p =>
      p.useCase.toLowerCase().includes(useCase.toLowerCase())
    );
  }
}
