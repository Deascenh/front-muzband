import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedFieldLegendComponent } from './blocked-field-legend.component';

describe('BlockedFieldLegendComponent', () => {
  let component: BlockedFieldLegendComponent;
  let fixture: ComponentFixture<BlockedFieldLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedFieldLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedFieldLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
