import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Music, Musician, User} from '../../../core/models';
import {Observable, timer} from 'rxjs';
import {IAppState} from '../../../core/store/App/App.state';
import {Store} from '@ngrx/store';
import {AddMusic} from '../../../core/store/music/music.actions';
import {selectSidenavMusics} from '../../../core/store/music/music.selectors';
import {takeWhile} from 'rxjs/operators';

export interface DialogData {
  musicCount: number;
  creator: User;
}

@Component({
  selector: 'app-add-music-dialog',
  templateUrl: './add-music-dialog.component.html',
  styleUrls: ['./add-music-dialog.component.scss']
})
export class AddMusicDialogComponent implements OnInit, OnDestroy {
  private alive = true;
  saving = false;
  musicScore = 0;
  musicianFormsNumber = 1;
  addedMusicians: Musician[] = [];
  musicForm: FormGroup;
  musicsState$: Observable<Music[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<AddMusicDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<IAppState>,
  ) {
    this.musicsState$ = this.store.select(selectSidenavMusics);
  }

  ngOnInit(): void {
    this.fetchMusicScore();
    this.initMusicForm();
  }

  saveMusic() {
    if (this.musicForm.valid) {
      this.saving = true;
      timer(300).subscribe(
        () => {
          this.store.dispatch(new AddMusic(this.musicForm.value));
          this.dialogRef.close();
        },
      );
    }
  }

  leave(): void {
    this.dialogRef.close();
  }

  onSaveMusician(musician: Musician) {
    this.addedMusicians.push(musician);
    this.musicianFormsNumber = ++this.addedMusicians.length;
  }

  onRemoveMusician(musician: Musician) {
    this.addedMusicians = this.addedMusicians.filter(item => item['@id'] !== musician['@id']);
    this.musicianFormsNumber = this.addedMusicians.length;
  }

  private fetchMusicScore(): void {
    this.musicsState$.pipe(
      takeWhile(() => this.alive),
    ).subscribe(musics => {
      this.musicScore = musics.length + 1;
    });
  }

  private initMusicForm(): void {
    this.musicForm = this.formBuilder.group({
      title: ['', Validators.required],
      creator: ['', Validators.required],
    });
    this.musicForm.get('creator').patchValue(this.data.creator['@id']);
  }

  ngOnDestroy(): void {
    this.saving = this.alive = false;
  }
}
