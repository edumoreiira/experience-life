import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipboardCopyComponent } from './clipboard-copy.component';

describe('ClipboardCopyComponent', () => {
  let component: ClipboardCopyComponent;
  let fixture: ComponentFixture<ClipboardCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipboardCopyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClipboardCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
