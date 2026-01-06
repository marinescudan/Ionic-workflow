import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonRange,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { play, pause, refresh } from 'ionicons/icons';
import { MarbleEvent, MarbleStream } from '@app/models/rxjs.model';

@Component({
  selector: 'app-marble-diagram',
  templateUrl: './marble-diagram.component.html',
  styleUrls: ['./marble-diagram.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonRange,
  ],
})
export class MarbleDiagramComponent implements OnInit, OnDestroy {
  @Input() inputStream!: MarbleStream;
  @Input() outputStream!: MarbleStream;
  @Input() operatorName!: string;

  isPlaying = false;
  currentTime = 0;
  speed = 1;

  private animationInterval?: any;
  private destroy$ = new Subject<void>();

  constructor() {
    addIcons({ play, pause, refresh });
  }

  ngOnInit() {
    // Auto-play on load
    setTimeout(() => this.play(), 500);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.stop();
  }

  play() {
    if (this.isPlaying) return;

    this.isPlaying = true;
    const frameTime = 1000 / this.speed; // 1000ms base, adjusted by speed

    this.animationInterval = interval(frameTime)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.currentTime += 100;

        if (this.currentTime >= this.inputStream.duration) {
          this.pause();
          setTimeout(() => this.reset(), 1000);
        }
      });
  }

  pause() {
    this.isPlaying = false;
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  reset() {
    this.pause();
    this.currentTime = 0;
    setTimeout(() => this.play(), 500);
  }

  stop() {
    this.pause();
    this.currentTime = 0;
  }

  onSpeedChange(event: any) {
    const wasPlaying = this.isPlaying;
    this.pause();
    this.speed = event.detail.value;
    if (wasPlaying) {
      this.play();
    }
  }

  // Get visible marbles for current time
  getVisibleMarbles(stream: MarbleStream): MarbleEvent[] {
    return stream.events.filter(event => event.time <= this.currentTime);
  }

  // Get marble position percentage
  getMarblePosition(event: MarbleEvent): number {
    return (event.time / this.inputStream.duration) * 100;
  }

  // Get playhead position
  getPlayheadPosition(): number {
    return (this.currentTime / this.inputStream.duration) * 100;
  }
}
