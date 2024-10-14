import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyApplicationsComponent } from './company-applications.component';

describe('CompanyApplicationsComponent', () => {
  let component: CompanyApplicationsComponent;
  let fixture: ComponentFixture<CompanyApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
