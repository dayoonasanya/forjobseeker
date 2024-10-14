import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobfieldsComponent } from './admin-jobfields.component';

describe('AdminJobfieldsComponent', () => {
  let component: AdminJobfieldsComponent;
  let fixture: ComponentFixture<AdminJobfieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminJobfieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJobfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
