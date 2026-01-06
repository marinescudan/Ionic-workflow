import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack, gitNetwork } from 'ionicons/icons';
import { DemoService } from '@services/demo/demo.service';
import { ChaptersService } from '@services/chapters/chapters.service';
import { DemoComponent } from '@app/models/demo.model';
import { Chapter } from '@app/models/chapter.model';
import { ComponentPlaygroundComponent } from '@components/component-playground/component-playground.component';
import { MarbleStream } from '@app/models/rxjs.model';
import { MarbleDiagramComponent } from '@components/marble-diagram/marble-diagram.component';
import { RxjsExamplesService } from '@services/rxjs/rxjs-examples.service';
import { RxJSPattern } from '@app/models/rxjs.model';
import { CodeSnippetComponent } from '@components/code-snippet/code-snippet.component';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    ComponentPlaygroundComponent,
    MarbleDiagramComponent,
    CodeSnippetComponent,
  ],
})
export class DemoPage implements OnInit {
  chapterId?: number;
  chapter?: Chapter;
  demos: DemoComponent[] = [];
  selectedDemo?: DemoComponent;
  mapExample: { input: MarbleStream; output: MarbleStream } = {
    input: {
      id: 'input-1',
      name: 'Input',
      duration: 5000,
      events: [
        { id: '1', value: 1, time: 500, color: '#2196F3', type: 'value' },
        { id: '2', value: 2, time: 1500, color: '#2196F3', type: 'value' },
        { id: '3', value: 3, time: 3000, color: '#2196F3', type: 'value' },
      ],
    },
    output: {
      id: 'output-1',
      name: 'Output',
      duration: 5000,
      events: [
        { id: '1', value: 2, time: 500, color: '#4CAF50', type: 'value' },
        { id: '2', value: 4, time: 1500, color: '#4CAF50', type: 'value' },
        { id: '3', value: 6, time: 3000, color: '#4CAF50', type: 'value' },
      ],
    },
  };
  patterns: RxJSPattern[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public demoService: DemoService, // I need it in the template, so make it public, alternatively I could create a wrappermethod in component
    private chaptersService: ChaptersService,
    private rxjsExamples: RxjsExamplesService
  ) {
    addIcons({ chevronBack, gitNetwork });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.chapterId = +params['chapterId'];
      this.loadDemos();
    });

    // Load patterns if Chapter 6
    if (this.chapterId === 5) {
      this.patterns = this.rxjsExamples.getAllPatterns();
    }
  }

  loadDemos() {
    if (this.chapterId) {
      // Load chapter info
      this.chapter = this.chaptersService.getChapterById(this.chapterId);

      // Load demos for this chapter
      this.demos = this.demoService.getDemosByChapterId(this.chapterId);

      // Select first demo by default
      if (this.demos.length > 0) {
        this.selectedDemo = this.demos[0];
      }
    }
  }

  selectDemo(demo: DemoComponent) {
    this.selectedDemo = demo;
  }

  goBack() {
    if (this.chapterId) {
      this.router.navigate(['/chapters', this.chapterId]);
    } else {
      this.router.navigate(['/chapters']);
    }
  }
}
