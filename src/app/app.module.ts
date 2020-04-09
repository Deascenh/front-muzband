import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {AppRoutingModule, ROUTED_APP_COMPONENTS} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {CommonModule, registerLocaleData} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {SharedModule} from './shared/shared.module';
import {AddMusicDialogComponent} from './shared/components/add-music-dialog/add-music-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MusicSheetComponent} from './music/music-sheet/music-sheet.component';
import {HeaderMenuComponent} from './layout/header-menu/header-menu.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {UserSheetComponent} from './shared/components/user-sheet/user-sheet.component';
import {InstrumentSheetComponent} from './shared/components/instrument-sheet/instrument-sheet.component';
import {MusicianWorksheetComponent} from './music/musician-worksheet/musician-worksheet.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MusicDataPanelComponent} from './music/music-sheet/music-data-panel/music-data-panel.component';
import {ConfirmOperationComponent} from './shared/components/confirm-operation/confirm-operation.component';
import localeFr from '@angular/common/locales/fr';
import {MusicianDataPanelComponent} from './music/musician-worksheet/musician-data-panel/musician-data-panel.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    ROUTED_APP_COMPONENTS,
    AppComponent,
    MusicSheetComponent,
    HeaderMenuComponent,
    MusicianWorksheetComponent,
    MusicDataPanelComponent,
    MusicianDataPanelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    CoreModule.forRoot(),
    SharedModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  entryComponents: [
    AddMusicDialogComponent,
    UserSheetComponent,
    InstrumentSheetComponent,
    ConfirmOperationComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
