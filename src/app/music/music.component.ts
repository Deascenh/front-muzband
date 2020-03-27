import { Component, OnInit } from '@angular/core';
import {IAppState} from '../core/store/App/App.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Music} from '../core/models';
import {selectFocusedMusic} from '../core/store/music/music.selectors';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  private focusedMusicState$: Observable<Music>;

  music: Music;

  constructor(private store: Store<IAppState>) {
    this.focusedMusicState$ = this.store.select(selectFocusedMusic);
  }

  ngOnInit() {
    this.focusedMusicState$.subscribe(focusedMusic => this.music = focusedMusic);
  }

}
