import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Instrument, Music, Musician, User} from '../../../core/models';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../core/store/App/App.state';
import {merge, Observable} from 'rxjs';
import {selectInstrumentList} from '../../../core/store/instrument/instrument.selectors';
import {selectUserList} from '../../../core/store/user/user.selectors';
import {map, startWith} from 'rxjs/operators';
import {isUser} from '../../directives/validators/is-user.directive';
import {isInstrument} from '../../directives/validators/is-instrument.directive';
import {MusicianService} from '../../../core/data/musicians.service';
import {MusicianFormService} from './musician-form.service';

/**
 * Category of action of the component.
 * Keys are actions, values correspond to
 * name of the mat-icon representing this action.
 */
enum EMusicianFormActions {
  Add = 'done',
  Invalid = 'remove',
  Remove = 'clear',
}

@Component({
  selector: 'app-musician-form',
  templateUrl: './musician-form.component.html',
  styleUrls: ['./musician-form.component.scss'],
  providers: [MusicianFormService]
})
export class MusicianFormComponent implements OnInit {
  musicianForm: FormGroup = new FormGroup({
    music: new FormControl('', [Validators.required]),
    instrument: new FormControl('', [Validators.required, isInstrument()]),
    user: new FormControl('', [isUser()]),
  });

  action = (() => {
    if (this.musicianForm.invalid) {
      return EMusicianFormActions.Invalid;
    }
    return this.musician ? EMusicianFormActions.Remove : EMusicianFormActions.Add;
  });

  toolTipMessage = (() => {
    switch (this.action()) {
      case EMusicianFormActions.Add: {
        return 'Valider';
      }
      case EMusicianFormActions.Remove: {
        return 'Retirer';
      }
    }
  });

  private pHydrated: Musician | null;
  private pMusic: Music;

  get musician(): Musician {
    return this.pHydrated;
  }

  @Input() set musician(value: Musician) {
    const isMusician: boolean = value instanceof Musician;
    this.pHydrated = (isMusician || value === null) ? value : null;
    if (isMusician) {
      this.patchMusicianForm(value);
    }
  }

  get music(): Music {
    return this.pMusic;
  }

  @Input() set music(value: Music) {
    if (value instanceof Music) {
      this.pMusic = value;
      this.musicianForm.get('music').patchValue(this.music['@id']);
    }
  }

  /**
   * If true, the information after saving will continue to appear;
   * If false, the component will reset to its initial state.
   */
  @Input() persistent = true;

  @Output() removeSuccess: EventEmitter<Musician> = new EventEmitter();
  @Output() saveSuccess: EventEmitter<Musician> = new EventEmitter();

  private instruments$: Observable<Instrument[]>;
  private members$: Observable<User[]>;

  filteredInstruments$: Observable<Instrument[]>;
  filteredMembers$: Observable<User[]>;
  instruments: Instrument[] = [];
  members: User[] = [];

  constructor(
    private store: Store<IAppState>,
    private musicianService: MusicianService,
    private musicianFormService: MusicianFormService,
  ) {
    this.instruments$ = this.store.select(selectInstrumentList);
    this.members$ = this.store.select(selectUserList);
  }

  ngOnInit() {
    this.initFieldsAutocomplete();
  }

  onClick(): void {
    switch (this.action()) {
      case EMusicianFormActions.Add: {
        this.addMusician();
        break;
      }
      case EMusicianFormActions.Remove: {
        this.removeMusician();
        break;
      }
    }
  }

  instrumentDisplayFn(instrument: Instrument): string {
    return instrument ? instrument.name : null;
  }

  memberDisplayFn(member: User): string {
    return member ? member.useName() : null;
  }

  private initFieldsAutocomplete() {
    merge(this.instruments$, this.members$)
      .subscribe((collection: Instrument[] | User[]) => {
        const first = collection[0];
        if (first instanceof Instrument) {
          this.instruments = collection as Instrument[];
          this.initInstrumentAutocomplete();
        } else if (first instanceof User) {
          this.members = collection as User[];
          this.initUserAutocomplete();
        }
      });
  }

  private addMusician(): void {
    const newMusician = MusicianFormService.getSavableMusician(this.musicianForm.value);
    this.musicianService.save(newMusician).subscribe(
      result => {
        if (result['@id']) {
          this.saveSuccess.emit(result);
        }
        if (this.persistent) {
          this.musician = new Musician(result);
        } else {
          this.reset();
        }
      },
      err => console.error(err),
    );
  }

  private removeMusician(): void {
    this.musicianService.delete(this.musician).subscribe(
      result => {
         if (result === null) {
           this.removeSuccess.emit(this.musician);
           this.reset();
         }
      },
      err => console.error(err)
    );
  }

  private initInstrumentAutocomplete(): void {
    this.filteredInstruments$ = this.musicianForm.get('instrument').valueChanges
      .pipe(
        startWith(''),
        map(value => {
          return value
            ? this.musicianFormService.instrumentFilter(value)
            : this.instruments;
        })
      );
  }

  private initUserAutocomplete(): void {
    this.filteredMembers$ = this.musicianForm.get('user').valueChanges
      .pipe(
        startWith(''),
        map(value => {
          return value
            ? this.musicianFormService.memberFilter(value)
            : this.members;
        })
      );
  }

  private reset() {
    this.musician = null;
    this.music = this.music;
  }

  private patchMusicianForm(value: Musician): void {
    if (value.user) {
      this.members$.subscribe(members => {
        this.musicianForm.patchValue({
          user: members.find(member => member['@id'] === value.user['@id'])
        });
      });
    }
    if (value.instruments.length > 0) {
      this.instruments$.subscribe(instruments => {
        this.musicianForm.patchValue({
          instrument: instruments.find(instrument => instrument['@id'] === value.instruments[0]),
        });
      });
    }
    this.music = this.music;
  }
}
