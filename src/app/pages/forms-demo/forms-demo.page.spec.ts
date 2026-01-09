import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsDemoPage } from './forms-demo.page';

describe('FormsDemoPage', () => {
  let component: FormsDemoPage;
  let fixture: ComponentFixture<FormsDemoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsDemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
