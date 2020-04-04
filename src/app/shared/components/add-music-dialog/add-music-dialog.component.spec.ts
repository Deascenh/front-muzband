import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMusicDialogComponent } from './add-music-dialog.component';

describe('AddMusicDialogComponent', () => {
  let component: AddMusicDialogComponent;
  let fixture: ComponentFixture<AddMusicDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMusicDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMusicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
