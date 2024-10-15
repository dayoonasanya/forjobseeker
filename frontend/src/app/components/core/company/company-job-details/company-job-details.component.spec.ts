import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyJobDetailsComponent } from './company-job-details.component';

describe('CompanyJobDetailsComponent', () => {
  let component: CompanyJobDetailsComponent;
  let fixture: ComponentFixture<CompanyJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyJobDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
