import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ChapterDetailPage } from './chapter-detail.page';

describe('ChapterDetailPage', () => {
  let component: ChapterDetailPage;
  let fixture: ComponentFixture<ChapterDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterDetailPage],
      providers: [
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChapterDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
