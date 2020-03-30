import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Instrument, Music, User} from '../../core/models';
import {Store} from '@ngrx/store';
import {IAppState} from '../../core/store/App/App.state';
import {concat, EMPTY, forkJoin, merge, Observable, of} from 'rxjs';
import {selectInstrumentList} from '../../core/store/instrument/instrument.selectors';
import {selectUserList} from '../../core/store/user/user.selectors';
import {delay, map, startWith, tap} from 'rxjs/operators';

@Component({
  selector: 'app-add-musician-form',
  templateUrl: './add-musician-form.component.html',
  styleUrls: ['./add-musician-form.component.scss']
})
export class AddMusicianFormComponent implements OnInit {
  @Input() music: Music = null;
  musicianForm: FormGroup;

  private instruments$: Observable<Instrument[]>;
  private members$: Observable<User[]>;

  private filteredInstruments$: Observable<Instrument[]>;
  private filteredMembers$: Observable<User[]>;

  private instruments: Instrument[] = [];
  private members: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<IAppState>,
  ) {
    this.instruments$ = this.store.select(selectInstrumentList);
    this.members$ = this.store.select(selectUserList);
  }

  ngOnInit() {
    this.getFieldsData();
    this.initMusicianForm().pipe(delay(3000))
      .subscribe(() => {
        // this.initFormAutocompleteFilters();
      });
  }

  private getFieldsData() {
    merge(this.instruments$, this.members$)
      .subscribe((collection: Instrument[] | User[]) => {
        const first = collection[0];
        if (first instanceof Instrument) {
          this.instruments = collection as Instrument[];
          console.log('Init from instrument affect');
          this.initFormAutocompleteFilters();
        } else if (first instanceof User) {
          this.members = collection as User[];
        }
      });
  }

  private initFormAutocompleteFilters() {
    console.log(this.musicianForm.get('instrument'));
    this.filteredInstruments$ = this.musicianForm.get('instrument').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => {
          return name ? this._filter(name) : this.instruments;
        })
      );
  }

  private _filter(name: string): Instrument[] {
    const filterValue = name.toLowerCase();

    return this.instruments.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private initMusicianForm(): Observable<FormGroup> {
    this.musicianForm = this.formBuilder.group({
      music: ['', Validators.required],
      instrument: ['', Validators.required],
      user: [''],
    });
    if (this.music) {
      this.musicianForm.get('music').patchValue(this.music['@id']);
    }
    return of(this.musicianForm);
  }

  instrumentDisplayFn(instrument: Instrument): string {
    return instrument.name;
  }

  memberDisplayFn(member: User): string {
    return member.useName();
  }

}
