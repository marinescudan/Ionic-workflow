import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChapterDetailPage } from './chapter-detail.page';

describe('ChapterDetailPage', () => {
  let component: ChapterDetailPage;
  let fixture: ComponentFixture<ChapterDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
