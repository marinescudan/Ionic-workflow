import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonInput,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonToast,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { copyOutline, refreshOutline, checkmarkCircle } from 'ionicons/icons';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { DemoComponent } from '@app/models/demo.model';
import { CodeSnippetComponent } from '@components/code-snippet/code-snippet.component';
import { SafeHtmlPipe } from '@app/pipes/safe-html-pipe';

declare const Prism: any;

@Component({
  selector: 'app-component-playground',
  templateUrl: './component-playground.component.html',
  styleUrls: ['./component-playground.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonInput,
    IonToggle,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel,
    IonToast,
    CodeSnippetComponent,
    SafeHtmlPipe,
  ],
})
export class ComponentPlaygroundComponent implements OnInit, OnDestroy {
  @Input() demoComponent!: DemoComponent;

  propsForm!: FormGroup;
  currentProps: Record<string, any> = {};
  generatedTemplate = '';
  generatedTypescript = '';
  showToast = false;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    addIcons({ copyOutline, refreshOutline, checkmarkCircle });
  }

  ngOnInit() {
    this.initializeForm();
    this.updateGenerated();
    this.watchFormChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm() {
    // Build form controls dynamically from prop definitions
    const formControls: Record<string, any> = {};

    this.demoComponent.propDefinitions.forEach(prop => {
      formControls[prop.name] = [prop.defaultValue];
    });

    this.propsForm = this.fb.group(formControls);
    this.currentProps = { ...this.demoComponent.defaultProps };
  }

  private watchFormChanges() {
    this.propsForm.valueChanges
      .pipe(
        debounceTime(300), // Wait 300ms after user stops typing
        takeUntil(this.destroy$)
      )
      .subscribe(values => {
        this.currentProps = values;
        this.updateGenerated();
      });
  }

  private updateGenerated() {
    this.generatedTemplate = this.demoComponent.templateGenerator(this.currentProps);
    this.generatedTypescript = this.demoComponent.typescriptGenerator(this.currentProps);
  }

  resetProps() {
    this.propsForm.reset(this.demoComponent.defaultProps);
    this.currentProps = { ...this.demoComponent.defaultProps };
    this.updateGenerated();
  }

  async copyTemplate() {
    await this.copyToClipboard(this.generatedTemplate);
  }

  async copyTypescript() {
    await this.copyToClipboard(this.generatedTypescript);
  }

  private async copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast = true;
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  // Get dynamic component HTML for preview
  getPreviewHtml(): string {
    return this.generatedTemplate;
  }
}
