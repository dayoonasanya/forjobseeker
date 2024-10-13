import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmployerComponent } from './register-employer.component';

describe('RegisterEmployerComponent', () => {
  let component: RegisterEmployerComponent;
  let fixture: ComponentFixture<RegisterEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterEmployerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
