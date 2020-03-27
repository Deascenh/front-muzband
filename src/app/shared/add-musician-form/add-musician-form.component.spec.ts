import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMusicianFormComponent } from './add-musician-form.component';

describe('AddMusicianFormComponent', () => {
  let component: AddMusicianFormComponent;
  let fixture: ComponentFixture<AddMusicianFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMusicianFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMusicianFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
