import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFillComponent } from './dynamic-fill.component';

describe('DynamicFillComponent', () => {
  let component: DynamicFillComponent;
  let fixture: ComponentFixture<DynamicFillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
