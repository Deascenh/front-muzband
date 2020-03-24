import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {AddMusicDialogComponent} from './add-music-dialog/add-music-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
    AddMusicDialogComponent
  ],
  exports: [
    AddMusicDialogComponent
  ],
})
export class SharedModule { }
