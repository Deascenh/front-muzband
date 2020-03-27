import { Component, OnInit } from '@angular/core';
import {IAppState} from '../core/store/App/App.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Instrument, Music, User} from '../core/models';
import {selectFocusedMusic} from '../core/store/music/music.selectors';
import {selectInstrumentList} from '../core/store/instrument/instrument.selectors';

export interface MusicianTab {
  tabTitle: string;
  instrument: Instrument;
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

  constructor(private store: Store<IAppState>) {
    this.focusedMusicState$ = this.store.select(selectFocusedMusic);
    this.instrumentsListState$ = this.store.select(selectInstrumentList);
  }

  ngOnInit() {
    this.focusedMusicState$.subscribe(focusedMusic => this.music = focusedMusic);
    this.instrumentsListState$.subscribe(instrumentList => this.instruments = instrumentList);

    this.drawMusicianTabs();
  }

  private drawMusicianTabs() {
    if (this.music) {
      for (const musician of this.music.musicians) {
        // TODO Draw musician tabs
      }
    }
  }

}
