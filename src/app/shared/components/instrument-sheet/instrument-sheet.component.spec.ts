import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentSheetComponent } from './instrument-sheet.component';

describe('InstrumentSheetComponent', () => {
  let component: InstrumentSheetComponent;
  let fixture: ComponentFixture<InstrumentSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
