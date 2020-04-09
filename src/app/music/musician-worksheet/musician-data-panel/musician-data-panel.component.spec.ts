import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicianDataPanelComponent } from './musician-data-panel.component';

describe('MusicianDataPanelComponent', () => {
  let component: MusicianDataPanelComponent;
  let fixture: ComponentFixture<MusicianDataPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicianDataPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianDataPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
