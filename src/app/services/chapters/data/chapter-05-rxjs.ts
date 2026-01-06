// src/app/services/chapters/data/chapter-05-rxjs.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_05_DATA: Chapter = {
  id: 5,
  title: 'RxJS & Reactive Programming',
  description: 'Master observables, operators, and reactive patterns',
  icon: 'git-network-outline',
  category: 'foundation',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 11,
      title: 'What is RxJS?',
      content: `
        <h2>What is RxJS?</h2>
        <p>RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using Observables.</p>

        <h3>Observable vs Promise</h3>
        <table>
          <tr><th>Feature</th><th>Promise</th><th>Observable</th></tr>
          <tr><td>Values</td><td>Single</td><td>Multiple over time</td></tr>
          <tr><td>Execution</td><td>Eager</td><td>Lazy</td></tr>
          <tr><td>Cancellable</td><td>No</td><td>Yes</td></tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 101,
          language: 'typescript',
          title: 'Promise vs Observable',
          code: `// Promise: Single value, eager
const promise = fetch('/api/data');
promise.then(data => console.log(data));

// Observable: Multiple values, lazy
const observable = new Observable(subscriber => {
  subscriber.next(1);
  setTimeout(() => subscriber.next(2), 1000);
});
observable.subscribe(value => console.log(value));`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Observable is lazy - nothing happens until subscribe()',
        'Observables can emit 0 to infinite values',
        'Use async pipe in Angular to auto-unsubscribe',
      ],
    },
  ],
};
