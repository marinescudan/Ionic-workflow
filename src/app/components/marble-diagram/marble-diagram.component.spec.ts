import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { MarbleDiagramComponent } from './marble-diagram.component';

describe('MarbleDiagramComponent', () => {
  let component: MarbleDiagramComponent;
  let fixture: ComponentFixture<MarbleDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarbleDiagramComponent],
      providers: [
        provideIonicAngular(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MarbleDiagramComponent);
    component = fixture.componentInstance;

    // Provide required inputs
    component.inputStream = { id: '1', name: 'input', events: [], duration: 100 };
    component.outputStream = { id: '2', name: 'output', events: [], duration: 100 };
    component.operatorName = 'map';

    // Spy on play to prevent auto-play animation in tests
    spyOn(component, 'play');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
