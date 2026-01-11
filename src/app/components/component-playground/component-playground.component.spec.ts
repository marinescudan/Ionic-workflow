import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentPlaygroundComponent } from './component-playground.component';

describe('ComponentPlaygroundComponent', () => {
  let component: ComponentPlaygroundComponent;
  let fixture: ComponentFixture<ComponentPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentPlaygroundComponent],
      providers: [
        provideIonicAngular(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentPlaygroundComponent);
    component = fixture.componentInstance;

    // Provide required input
    component.demoComponent = {
      id: '1',
      name: 'Button',
      description: 'Test button',
      category: 'button',
      icon: 'square',
      defaultProps: {},
      propDefinitions: [],
      templateGenerator: (props: any) => `<ion-button>${props.text || 'Click me'}</ion-button>`,
      typescriptGenerator: (props: any) => `// Button code`,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
