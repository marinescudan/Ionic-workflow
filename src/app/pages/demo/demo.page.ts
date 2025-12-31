
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
  IonCardContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';
import { DemoService } from '@services/demo/demo.service';
import { ChaptersService } from '@services/chapters/chapters.service';
import { DemoComponent } from '@app/models/demo.model';
import { Chapter } from '@app/models/chapter.model';
import { ComponentPlaygroundComponent } from '@components/component-playground/component-playground.component';

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
    IonCardContent,
    ComponentPlaygroundComponent,
  ],
})
export class DemoPage implements OnInit {
  chapterId?: number;
  chapter?: Chapter;
  demos: DemoComponent[] = [];
  selectedDemo?: DemoComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private demoService: DemoService,
    private chaptersService: ChaptersService
  ) {
    addIcons({ chevronBack });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.chapterId = +params['chapterId'];
      this.loadDemos();
    });
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
