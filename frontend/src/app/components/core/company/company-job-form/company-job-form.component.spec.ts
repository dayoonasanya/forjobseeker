import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyJobFormComponent } from './company-job-form.component';

describe('CompanyJobFormComponent', () => {
  let component: CompanyJobFormComponent;
  let fixture: ComponentFixture<CompanyJobFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyJobFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyJobFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
