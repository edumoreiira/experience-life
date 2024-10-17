import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalComprarMvPageComponent } from './portal-comprar-mv-page.component';

describe('PortalComprarMvPageComponent', () => {
  let component: PortalComprarMvPageComponent;
  let fixture: ComponentFixture<PortalComprarMvPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalComprarMvPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalComprarMvPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
