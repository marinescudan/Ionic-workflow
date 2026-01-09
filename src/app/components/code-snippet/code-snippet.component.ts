
import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import { IonButton, IonIcon, IonToast } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { copyOutline, checkmarkOutline } from 'ionicons/icons';

declare const Prism: any; // Prism is loaded globally from angular.json

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonToast],
})
export class CodeSnippetComponent implements AfterViewInit {
  @Input() code!: string;
  @Input() language: string = 'typescript';
  @Input() title?: string;
  @Input() description?: string;
  @Input() copyable: boolean = true;

  @ViewChild('codeElement', { static: false }) codeElement!: ElementRef;

  copied = false;
  showToast = false;

  constructor() {
    addIcons({ copyOutline, checkmarkOutline });
  }

  ngAfterViewInit() {
    // Apply syntax highlighting after view renders
    if (this.codeElement && typeof Prism !== 'undefined') {
      Prism.highlightElement(this.codeElement.nativeElement);
    }
  }

  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.code);
      this.copied = true;
      this.showToast = true;

      // Reset copied state after 2 seconds
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
}
