import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsSelectComponent } from './options-select.component';

describe('OptionsSelectComponent', () => {
  let component: OptionsSelectComponent;
  let fixture: ComponentFixture<OptionsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
