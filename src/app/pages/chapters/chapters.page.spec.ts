import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ChaptersPage } from './chapters.page';

describe('ChaptersPage', () => {
  let component: ChaptersPage;
  let fixture: ComponentFixture<ChaptersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChaptersPage],
      providers: [
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChaptersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
