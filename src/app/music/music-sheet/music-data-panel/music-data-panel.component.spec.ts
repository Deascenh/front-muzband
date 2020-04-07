import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicDataPanelComponent } from './music-data-panel.component';

describe('DataPanelComponent', () => {
  let component: MusicDataPanelComponent;
  let fixture: ComponentFixture<MusicDataPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicDataPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicDataPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
