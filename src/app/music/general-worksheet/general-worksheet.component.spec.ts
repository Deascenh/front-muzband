import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralWorksheetComponent } from './general-worksheet.component';

describe('GeneralWorksheetComponent', () => {
  let component: GeneralWorksheetComponent;
  let fixture: ComponentFixture<GeneralWorksheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralWorksheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralWorksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
