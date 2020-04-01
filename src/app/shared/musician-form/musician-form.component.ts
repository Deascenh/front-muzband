import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Instrument, Music, Musician, User} from '../../core/models';
import {Store} from '@ngrx/store';
import {IAppState} from '../../core/store/App/App.state';
import {combineLatest, forkJoin, merge, Observable} from 'rxjs';
import {selectInstrumentList} from '../../core/store/instrument/instrument.selectors';
import {selectUserList} from '../../core/store/user/user.selectors';
import {map, startWith} from 'rxjs/operators';
import {isUser} from '../directives/validators/is-user.directive';
import {isInstrument} from '../directives/validators/is-instrument.directive';
import {MusicianService} from '../../core/data/musicians.service';
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

// TODO Idea: An HYDRATED form with its changed (dirty, touch?) can EDIT/PUT
//  Icon/Color : blue pen
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

  private pHydrated: Musician;
  private pMusic: Music;

  get musician(): Musician {
    return this.pHydrated;
  }

  @Input() set musician(value: Musician) {
    if (value instanceof Musician) {
      this.pHydrated = value;
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

  @Output() removeSuccess: EventEmitter<boolean> = new EventEmitter();
  @Output() saveSuccess: EventEmitter<Musician> = new EventEmitter();

  private instruments$: Observable<Instrument[]>;
  private members$: Observable<User[]>;

  filteredInstruments$: Observable<Instrument[]>;
  filteredMembers$: Observable<User[]>;
  instruments: Instrument[] = [];
  members: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
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
    return instrument.name;
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
        this.musician = new Musician(result);
        this.saveSuccess.emit(this.musician);
      },
      (err) => console.error(err)
    );
  }

  private removeMusician(): void {
    this.musicianService.delete(this.musician).subscribe(
      () => this.removeSuccess.emit(true),
      (err) => console.error(err),
    );
  }

  private initInstrumentAutocomplete(): void {
    this.filteredInstruments$ = this.musicianForm.get('instrument').valueChanges
      .pipe(
        startWith(''),
        map((value: string | Instrument) => typeof value === 'string' ? value : value.name),
        map(name => {
          return name
            ? this.musicianFormService.instrumentFilter(name)
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

  private patchMusicianForm(value: Musician) {
    if (value.user) {
      this.members$.subscribe(members => {
        this.musicianForm.patchValue({
          user: members.find(member => member['@id'] === value.user['@id'])
        });
      });
    }
    this.instruments$.subscribe(instruments => {
      this.musicianForm.patchValue({
        instrument: instruments.find(instrument => instrument['@id'] === value.instruments[0]),
      });
    });
  }
}
