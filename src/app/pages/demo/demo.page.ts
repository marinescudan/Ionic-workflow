import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  IonCardContent,
  IonButton,
  ModalController,
  NavController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBack,
  gitNetwork,
  arrowForward,
  arrowBack,
  home,
} from 'ionicons/icons';
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
import { SimpleModalComponent } from '@components/modals/simple-modal/simple-modal.component';
import { FormModalComponent } from '@components/modals/form-modal/form-modal.component';
import { FullpageModalComponent } from '@components/modals/fullpage-modal/fullpage-modal.component';
import { MARBLE_MAP_EXAMPLE } from '@services/rxjs/data/marble-diagrams.constants';


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
    IonButton,
    RouterLink,
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
    input: MARBLE_MAP_EXAMPLE.input,
    output: MARBLE_MAP_EXAMPLE.output,
  };
  patterns: RxJSPattern[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public demoService: DemoService, // I need it in the template, so make it public, alternatively I could create a wrappermethod in component
    private chaptersService: ChaptersService,
    private rxjsExamples: RxjsExamplesService,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {
    addIcons({ chevronBack, gitNetwork, arrowForward, arrowBack, home });
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

  // === Navigation Demos (Chapter 6) ===

  navigateForward() {
    this.navCtrl.navigateForward('/tabs/explore');
  }

  navigateBack() {
    this.navCtrl.navigateBack('/tabs/home');
  }

  navigateRoot() {
    this.navCtrl.navigateRoot('/tabs/home');
  }

  // === Modal Demos ===

  async openSimpleModal() {
    const modal = await this.modalCtrl.create({
      component: SimpleModalComponent,
      componentProps: {
        title: 'Simple Modal',
        message: 'This is a basic modal with confirm/cancel buttons.',
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log('Modal dismissed:', { data, role });
  }

  async openFormModal() {
    const modal = await this.modalCtrl.create({
      component: FormModalComponent,
      componentProps: {
        title: 'Add Item',
      },
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.5,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Form submitted:', data);
    }
  }

  async openFullpageModal() {
    const modal = await this.modalCtrl.create({
      component: FullpageModalComponent,
      componentProps: {
        title: 'Full Page Modal',
        content: 'This modal takes up the entire screen. Use it for immersive experiences like reading long content, viewing media, or complex forms.',
      },
    });

    await modal.present();
  }

  navigateToFormsDemo(): void {
    this.router.navigate(['/forms-demo']);
  }
}
