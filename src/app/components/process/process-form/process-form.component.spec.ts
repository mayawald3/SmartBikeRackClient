import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessFormComponent } from './process-form.component';

describe('ProcessFormComponent', () => {
  let component: ProcessFormComponent;
  let fixture: ComponentFixture<ProcessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
