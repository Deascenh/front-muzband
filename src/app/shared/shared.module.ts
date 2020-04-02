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
import {MusicianFormComponent} from './musician-form/musician-form.component';
import {UserSheetComponent} from './user-sheet/user-sheet.component';
import {InstrumentSheetComponent} from './instrument-sheet/instrument-sheet.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRippleModule} from '@angular/material/core';
import {IsUserDirective} from './directives/validators/is-user.directive';
import {IsInstrumentDirective} from './directives/validators/is-instrument.directive';
import {WorkInProgressComponent} from './work-in-progress/work-in-progress.component';

export const SHARED_COMPONENTS = [
  AddMusicDialogComponent,
  MusicianFormComponent,
  UserSheetComponent,
  InstrumentSheetComponent,
  WorkInProgressComponent,
];

export const SHARED_DIRECTIVES = [
  IsUserDirective,
  IsInstrumentDirective
];

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
    MatAutocompleteModule,
    MatRippleModule,
  ],
  declarations: [
    SHARED_COMPONENTS,
    SHARED_DIRECTIVES,
  ],
  exports: [
    SHARED_COMPONENTS,
    SHARED_DIRECTIVES,
  ],
})
export class SharedModule { }
