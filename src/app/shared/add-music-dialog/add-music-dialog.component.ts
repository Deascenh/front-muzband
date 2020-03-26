import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../core/models';
import {MusicService} from '../../core/data/music.service';
import {timer} from 'rxjs';
import {IAppState} from '../../core/store/App/App.state';
import {Store} from '@ngrx/store';
import {AddMusic} from '../../core/store/music/music.actions';

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
  saving = false;
  incrMusicCount = 0;
  musicForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<AddMusicDialogComponent>,
    private formBuilder: FormBuilder,
    private musicService: MusicService,
    private store: Store<IAppState>,
  ) {
    this.incrMusicCount = this.data.musicCount + 1;
  }

  ngOnInit(): void {
    this.initMusicForm();
  }

  private initMusicForm(): void {
    this.musicForm = this.formBuilder.group({
      title: ['', Validators.required],
      creator: ['', Validators.required],
    });
    this.musicForm.get('creator').patchValue(this.data.creator['@id']);
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

  ngOnDestroy(): void {
    this.saving = false;
  }
}
