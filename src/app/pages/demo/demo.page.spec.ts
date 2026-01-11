import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { DemoPage } from './demo.page';

describe('DemoPage', () => {
  let component: DemoPage;
  let fixture: ComponentFixture<DemoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoPage],
      providers: [
        provideRouter([]),
        provideIonicAngular(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
