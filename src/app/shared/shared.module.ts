import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {AddMusicDialogComponent} from './add-music-dialog/add-music-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  declarations: [
    AddMusicDialogComponent,
  ],
  exports: [
    AddMusicDialogComponent,
  ],
})
export class SharedModule { }
