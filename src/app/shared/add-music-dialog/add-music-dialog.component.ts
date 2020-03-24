import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  musicCount: number;
}

@Component({
  selector: 'app-add-music-dialog',
  templateUrl: './add-music-dialog.component.html',
  styleUrls: ['./add-music-dialog.component.scss']
})
export class AddMusicDialogComponent implements OnDestroy {
  incrMusicCount = 0;

  constructor(
    public dialogRef: MatDialogRef<AddMusicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.incrMusicCount = data.musicCount + 1;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    console.info(`${this.dialogRef._containerInstance._id} is destroyed.`);
  }
}
