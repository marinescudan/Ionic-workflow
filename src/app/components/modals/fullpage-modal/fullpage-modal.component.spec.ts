import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { FullpageModalComponent } from './fullpage-modal.component';

describe('FullpageModalComponent', () => {
  let component: FullpageModalComponent;
  let fixture: ComponentFixture<FullpageModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FullpageModalComponent],
      providers: [
        provideIonicAngular(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FullpageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
