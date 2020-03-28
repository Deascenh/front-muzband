import { Component, OnInit } from '@angular/core';
import {IAppState} from '../core/store/App/App.state';
import {Store} from '@ngrx/store';
import {merge, Observable} from 'rxjs';
import { Instrument, Music, Musician, User } from '../core/models';
import {selectFocusedMusic} from '../core/store/music/music.selectors';
import {selectInstrumentList} from '../core/store/instrument/instrument.selectors';
import { tap } from 'rxjs/operators';

export interface MusicianTab {
  headerLabel?: string;
  instrument: string | Instrument;
  user: User;
}

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  private focusedMusicState$: Observable<Music>;
  private instrumentsListState$: Observable<Instrument[]>;

  music: Music;
  instruments: Instrument[] = [];
  musicianTabs: MusicianTab[] = [];

  private static byHeaderLabel = (
    a: MusicianTab,
    b: MusicianTab
  ) => a.headerLabel.localeCompare(b.headerLabel);

  constructor(private store: Store<IAppState>) {
    this.focusedMusicState$ = this.store.select(selectFocusedMusic);
    this.instrumentsListState$ = this.store.select(selectInstrumentList);
  }

  ngOnInit() {
    merge(
      this.focusedMusicState$,
      this.instrumentsListState$,
    ).pipe(
      tap((result: Music | Instrument[]) => {
        if (result instanceof Music) {
          this.musicianTabs = [];
          this.music = result;
        }
        if (result instanceof Array) {
          this.instruments = result;
        }
      })
    ).subscribe(() => this.fillMusicianTabs());
  }

  private fillMusicianTabs() {
    if (this.music) {
      for (const musician of (this.music.musicians as Musician[])) {
        for (const mInstrument of (musician as Musician).instruments) {
          const musicianTabsLength =  this.musicianTabs.push({
            instrument: mInstrument,
            user: musician.user as User,
          });
          this.patchTabsLabel(musicianTabsLength - 1);
        }
      }
      this.musicianTabs.sort(MusicComponent.byHeaderLabel);
    }
  }

  private patchTabsLabel(newEntryPosition: number) {
    const newEntry = this.musicianTabs[newEntryPosition];

    const nestedInstrument: Instrument = this.instruments.find(
      instrument => instrument['@id'] === (newEntry.instrument['@id'] || newEntry.instrument)
    );
    const tabsEqualInstrument = this.musicianTabs.filter(
      tab => tab.instrument === (nestedInstrument['@id'] || nestedInstrument)
    );

    if (tabsEqualInstrument.length > 1) {
      this.updateTabsLabel(tabsEqualInstrument, nestedInstrument);
    } else {
      newEntry.headerLabel = nestedInstrument.name;
    }
  }
  /**
   * Number the tabs with the same label to better distinguish them
   *
   * @param { Musician[] } toRetitle Tabs with the same instrument which need to be retitled
   * @param { Instrument } instrument Entity which gives its name to the tabs
   */
  private updateTabsLabel(toRetitle: MusicianTab[], instrument: Instrument) {
    let theSameTotal = toRetitle.length;
    this.musicianTabs.forEach(tab => {
      if (toRetitle.includes(tab)) {
        tab.headerLabel = `${instrument.name} ${theSameTotal--}`;
      }
    });
  }

}
