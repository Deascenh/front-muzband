import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Instrument, Music, User} from '../../core/models';
import {Store} from '@ngrx/store';
import {IAppState} from '../../core/store/App/App.state';
import {merge, Observable} from 'rxjs';
import {selectInstrumentList} from '../../core/store/instrument/instrument.selectors';
import {selectUserList} from '../../core/store/user/user.selectors';
import {map, startWith} from 'rxjs/operators';
import {isUser} from '../directives/validators/is-user.directive';
import {isInstrument} from '../directives/validators/is-instrument.directive';
import {MusicianService} from '../../core/data/musicians.service';
import {MusicianFormService} from './musician-form.service';

enum EMusicianFormActions {
  Add = 'done',
  Invalid = 'remove',
  Remove = 'clear',
}

@Component({
  selector: 'app-add-musician-form',
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

  private pMusic: Music;
  formHydrated = false;

  action = (() => {
    if (this.musicianForm.invalid) {
      return EMusicianFormActions.Invalid;
    }
    return this.formHydrated ? EMusicianFormActions.Remove : EMusicianFormActions.Add;
  });

  @Input() set music(value: Music) {
    if (value instanceof Music) {
      this.pMusic = value;
      this.musicianForm.get('music').patchValue(this.music['@id']);
    }
  }

  get music(): Music {
    return this.pMusic;
  }

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
    }
  }

  private addMusician(): void {
    const newMusician = MusicianFormService.getSavableMusician(this.musicianForm.value);
    this.musicianService.save(newMusician).subscribe(result => {
      console.info(result);
    });
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

  instrumentDisplayFn(instrument: Instrument): string {
    return instrument.name;
  }

  memberDisplayFn(member: User): string {
    return member ? member.useName() : null;
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
}
