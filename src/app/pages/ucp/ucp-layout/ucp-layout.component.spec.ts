import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcpLayoutComponent } from './ucp-layout.component';

describe('UcpLayoutComponent', () => {
  let component: UcpLayoutComponent;
  let fixture: ComponentFixture<UcpLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UcpLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UcpLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
