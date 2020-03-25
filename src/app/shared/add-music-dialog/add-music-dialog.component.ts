import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../core/models';
import {MusicService} from '../../core/data/music.service';
import {timer} from 'rxjs';

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
      this.musicService.save(this.musicForm.value)
        .subscribe(result => {
          timer(300).subscribe(() => this.dialogRef.close(result));
        }
      );
    }
  }

  leave(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    console.info(`${this.dialogRef._containerInstance._id} is destroyed.`);
  }
}
