import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Music, Musician, User} from '../../../core/models';
import {BehaviorSubject, Observable} from 'rxjs';
import {IAppState} from '../../../core/store/App/App.state';
import {Store} from '@ngrx/store';
import {AddMusic, AttachMusician, DetachMusician} from '../../../core/store/music/music.actions';
import {selectSidenavMusics} from '../../../core/store/music/music.selectors';
import {takeWhile} from 'rxjs/operators';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MusicService} from '../../../core/data/music.service';
import {Router} from '@angular/router';

export interface DialogData {
  musicCount: number;
  creator: User;
}

@Component({
  selector: 'app-add-music-dialog',
  templateUrl: './add-music-dialog.component.html',
  styleUrls: ['./add-music-dialog.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false }
  }]
})
export class AddMusicDialogComponent implements OnInit, OnDestroy {
  private alive = true;
  private musicSubject = new BehaviorSubject<Music>(null);
  private musiciansSubject = new BehaviorSubject<Musician[]>([]);

  saving = false;
  musicScore = 0;
  pieceForm: FormGroup;
  musiciansForm: FormGroup;
  musicForm: FormGroup = this.formBuilder.group({
    piece: this.pieceForm,
    musicians: this.musiciansForm,
  });
  musicsState$: Observable<Music[]>;

  get music(): Music {
    return this.musicSubject.getValue();
  }

  get musicians(): Musician[] {
    return this.musiciansSubject.getValue();
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<AddMusicDialogComponent>,
    private musicService: MusicService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<IAppState>,
  ) {
    this.musicsState$ = this.store.select(selectSidenavMusics);
  }

  ngOnInit(): void {
    this.fetchMusicScore();
    this.initForms();
  }

  saveMusic() {
    if (!this.music && this.pieceForm.valid) {
      this.saving = true;
      this.musicService.save(this.pieceForm.value)
        .subscribe((result) => {
          if (result['@id']) {
            this.musicSubject.next(result);
            this.store.dispatch(new AddMusic(this.music));
            this.saving = false;
          }
      });
    }
  }

  terminate() {
    if (this.musicForm.valid) {
      this.musicSubject.subscribe(music => {
        this.router.navigate(['music', music.id]);
        this.dialogRef.close();
      });
    }
  }

  leave(): void {
    this.dialogRef.close();
  }

  onSaveMusician(musician: Musician) {
    this.musiciansSubject.next([...this.musicians, musician]);
    this.store.dispatch(new AttachMusician(musician));
  }

  onRemoveMusician(musician: Musician) {
    this.musiciansSubject.next(this.musicians.filter(item => item['@id'] !== musician['@id']));
    this.store.dispatch(new DetachMusician(musician));
  }

  private fetchMusicScore(): void {
    this.musicsState$.pipe(
      takeWhile(() => this.alive),
    ).subscribe(musics => {
      this.musicScore = musics.length + 1;
    });
  }

  private initForms(): void {
    this.pieceForm = this.formBuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      creator: ['', Validators.required],
    });
    this.pieceForm.get('creator').patchValue(this.data.creator['@id']);

    this.musiciansForm = this.formBuilder.group({
      musicians: this.formBuilder.array([]),
    });
  }

  ngOnDestroy(): void {
    this.saving = this.alive = false;
  }
}
