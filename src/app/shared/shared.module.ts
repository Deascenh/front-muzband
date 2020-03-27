import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {AddMusicDialogComponent} from './add-music-dialog/add-music-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AddMusicianFormComponent } from './add-musician-form/add-musician-form.component';

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
    MatProgressSpinnerModule,
  ],
  declarations: [
    AddMusicDialogComponent,
    AddMusicianFormComponent,
  ],
  exports: [
    AddMusicDialogComponent,
    AddMusicianFormComponent,
  ],
})
export class SharedModule { }
