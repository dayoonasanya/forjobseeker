import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobseekersComponent } from './admin-jobseekers.component';

describe('AdminJobseekersComponent', () => {
  let component: AdminJobseekersComponent;
  let fixture: ComponentFixture<AdminJobseekersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminJobseekersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJobseekersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
