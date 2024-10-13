import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterJobseekerComponent } from './register-jobseeker.component';

describe('RegisterJobseekerComponent', () => {
  let component: RegisterJobseekerComponent;
  let fixture: ComponentFixture<RegisterJobseekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterJobseekerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterJobseekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
