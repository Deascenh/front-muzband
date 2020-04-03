import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicianWorksheetComponent } from './musician-worksheet.component';

describe('MusicianWorksheetComponent', () => {
  let component: MusicianWorksheetComponent;
  let fixture: ComponentFixture<MusicianWorksheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicianWorksheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianWorksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
