import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {AddMusicDialogComponent} from './components/add-music-dialog/add-music-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MusicianFormComponent} from './components/musician-form/musician-form.component';
import {UserSheetComponent} from './components/user-sheet/user-sheet.component';
import {InstrumentSheetComponent} from './components/instrument-sheet/instrument-sheet.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRippleModule} from '@angular/material/core';
import {IsUserDirective} from './directives/validators/is-user.directive';
import {IsInstrumentDirective} from './directives/validators/is-instrument.directive';
import {WorkInProgressComponent} from './components/work-in-progress/work-in-progress.component';
import {SamePasswordsDirective} from './directives/validators/same-passwords.directive';
import {MatStepperModule} from '@angular/material/stepper';
import {FillPipe} from './pipes/fill.pipe';
import {ConfirmOperationComponent} from './components/confirm-operation/confirm-operation.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ContentNotFoundComponent} from './components/content-not-found/content-not-found.component';

export const SHARED_COMPONENTS = [
  AddMusicDialogComponent,
  MusicianFormComponent,
  UserSheetComponent,
  InstrumentSheetComponent,
  WorkInProgressComponent,
  ConfirmOperationComponent,
  ContentNotFoundComponent,
];

export const SHARED_DIRECTIVES = [
  IsUserDirective,
  IsInstrumentDirective,
  SamePasswordsDirective,
];

export const SHARED_PIPES = [
  FillPipe,
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
    MatStepperModule,
    MatTooltipModule,
  ],
  declarations: [
    SHARED_COMPONENTS,
    SHARED_DIRECTIVES,
    SHARED_PIPES,
  ],
  exports: [
    SHARED_COMPONENTS,
    SHARED_DIRECTIVES,
    SHARED_PIPES,
  ],
})
export class SharedModule { }
