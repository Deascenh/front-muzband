import {Component, OnInit, ViewChild} from '@angular/core';
import {IAppState} from '../core/store/App/App.state';
import {Store} from '@ngrx/store';
import {merge, Observable} from 'rxjs';
import {Instrument, Music, Musician, User} from '../core/models';
import {focusedMusic} from '../core/store/music/music.selectors';
import {selectInstrumentList} from '../core/store/instrument/instrument.selectors';
import {tap} from 'rxjs/operators';
import {AttachMusician} from '../core/store/music/music.actions';
import {MusicianWorksheetData} from './musician-worksheet/musician-worksheet.component';
import {MatTabGroup} from '@angular/material/tabs';

export interface MusicianTab {
  headerLabel?: string;
  resources: MusicianWorksheetData;
}

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  private static byHeaderLabel = ((
    a: MusicianTab,
    b: MusicianTab
  ) => a.headerLabel.localeCompare(b.headerLabel));

  private focusedMusicState$: Observable<Music>;
  private instrumentsListState$: Observable<Instrument[]>;

  music: Music;
  instruments: Instrument[] = [];
  musicianTabs: MusicianTab[] = [];

  @ViewChild('sheets', { static: false }) sheets: MatTabGroup;

  constructor(
    private store: Store<IAppState>
  ) {
    this.focusedMusicState$ = this.store.select(focusedMusic);
    this.instrumentsListState$ = this.store.select(selectInstrumentList);
  }

  ngOnInit() {
    // TODO Change this!
    merge(
      this.focusedMusicState$,
      this.instrumentsListState$,
    ).pipe(
      tap((result: Music | Instrument[]) => {
        if (result instanceof Music) {
          if (this.music && this.musicLostMusician(result)) {
            this.sheets.selectedIndex = 0;
          }
          this.music = result;
        }
        if (result instanceof Array) {
          this.instruments = result;
        }
      })
    ).subscribe(() => {
      // TODO Change this! Not suitable condition when using rxjs/merge()
      //  rxjs/tap() this way above is nonsense.
      if (this.music && this.instruments.length > 0) {
        this.fillMusicianTabs();
      }
    });
  }

  onNewMusician(musician: Musician) {
    this.store.dispatch(new AttachMusician(musician));
    this.sheets.selectedIndex = 0;
  }

  musicLostMusician(music: Music) {
    return music['@id'] === this.music['@id']
      && music.musicians.length < this.music.musicians.length;
  }

  private fillMusicianTabs() {
    this.musicianTabs = [];
    for (const musician of (this.music.musicians as Musician[])) {
      for (const mInstrument of (musician as Musician).instruments) {
        const nestedInstrument = this.instruments.find(instrument => instrument['@id'] === mInstrument);
        const musicianTabsLength =  this.musicianTabs.push({
          resources : {
            instrument: nestedInstrument,
            member: musician.user as User,
            musician,
          },
        });
        this.patchTabsLabel(musicianTabsLength - 1, nestedInstrument);
      }
    }
    this.musicianTabs.sort(MusicComponent.byHeaderLabel);
  }

  private patchTabsLabel(newEntryPosition: number, instrument: Instrument) {
    const newEntry = this.musicianTabs[newEntryPosition];
    const tabsEqualInstrument = this.musicianTabs.filter(tab => tab.resources.instrument['@id'] === instrument['@id']);

    if (tabsEqualInstrument.length > 1) {
      this.updateTabsLabel(tabsEqualInstrument, instrument);
    } else {
      newEntry.headerLabel = instrument.name;
    }
  }
  /**
   * Number the tabs with the same label to better distinguish them
   *
   * @param { Musician[] } toRetitle Tabs with the same instrument which need to be retitled
   * @param { Instrument } instrument Entity which gives its name to the tabs
   */
  private updateTabsLabel(toRetitle: MusicianTab[], instrument: Instrument) {
    let total = toRetitle.length;
    this.musicianTabs.forEach(tab => {
      if (toRetitle.includes(tab)) {
        tab.headerLabel = `${instrument.name} ${total--}`;
      }
    });
  }

}
