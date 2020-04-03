import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {SharedModule} from './shared/shared.module';
import {AddMusicDialogComponent} from './shared/add-music-dialog/add-music-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MusicSheetComponent} from './music/music-sheet/music-sheet.component';
import {HeaderMenuComponent} from './layout/header-menu/header-menu.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {UserSheetComponent} from './shared/user-sheet/user-sheet.component';
import {InstrumentSheetComponent} from './shared/instrument-sheet/instrument-sheet.component';
import {MusicianWorksheetComponent} from './music/musician-worksheet/musician-worksheet.component';

@NgModule({
  declarations: [
    ROUTED_APP_COMPONENTS,
    AppComponent,
    MusicSheetComponent,
    HeaderMenuComponent,
    MusicianWorksheetComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
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
    CoreModule.forRoot(),
    SharedModule,
  ],
  providers: [],
  entryComponents: [
    AddMusicDialogComponent,
    UserSheetComponent,
    InstrumentSheetComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
