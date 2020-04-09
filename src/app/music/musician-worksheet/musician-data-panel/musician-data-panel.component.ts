import {Component, Input, OnInit} from '@angular/core';
import {Instrument, Musician, User} from '../../../core/models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfirmOperationService} from '../../../core/utils/confirm-operation.service';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../core/store/App/App.state';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {AppSnackbarService} from '../../../core/utils/app-snackbar.service';
import {MusicianService} from '../../../core/data/musicians.service';
import {AttachMusician, DetachMusician} from '../../../core/store/music/music.actions';
import {MusicianWorksheetData} from '../musician-worksheet.component';
import {Observable} from 'rxjs';
import {MusicianFormService} from '../../../shared/components/musician-form/musician-form.service';

@Component({
  selector: 'app-musician-data-panel',
  templateUrl: './musician-data-panel.component.html',
  styleUrls: ['./musician-data-panel.component.scss'],
  providers: [
    DatePipe,
    MusicianFormService,
  ],
})
export class MusicianDataPanelComponent implements OnInit {

  private pHydrated: MusicianWorksheetData;

  filteredInstruments$: Observable<Instrument[]>;
  filteredMembers$: Observable<User[]>;

  instrumentDisplayFn = MusicianFormService.instrumentDisplayFn;
  memberDisplayFn = MusicianFormService.memberDisplayFn;

  @Input() set worksheetData(data: MusicianWorksheetData) {
    this.pHydrated = data;
    this.initForm();
  }

  get member(): User {
    return this.pHydrated.member;
  }

  get instrument(): Instrument {
    return this.pHydrated.instrument;
  }

  get musician(): Musician {
    return this.pHydrated.musician;
  }

  musicianForm: FormGroup;
  dataPanelOpen = true;
  readonly = true;

  constructor(
    private formBuilder: FormBuilder,
    private musicianService: MusicianService,
    private confirmOperation: ConfirmOperationService,
    private store: Store<IAppState>,
    private router: Router,
    private datePipe: DatePipe,
    private snackBar: AppSnackbarService,
    private musicianFormService: MusicianFormService,
  ) { }

  ngOnInit(): void {
    this.filteredInstruments$ = this.musicianFormService.initInstrumentAutocomplete(
      this.musicianForm.get('instrument')
    );
    this.filteredMembers$ = this.musicianFormService.initUserAutocomplete(
      this.musicianForm.get('user')
    );
  }

  toggleMode(event) {
    this.readonly = !event.checked;
  }

  delete() {
    const deleteOperation = this.musicianService.delete(this.musician);
    const message = `Souhaitez vous vraiment supprimer cette feuille de travail ? \
      Toutes les informations qu'elle regroupe ne seront plus visibles.`;

    this.confirmOperation.confirmDelete(message, deleteOperation)
      .subscribe(result => {
        if (result.success && result.payload === null) {
          this.store.dispatch(new DetachMusician(this.musician));
          this.router.navigateByUrl('/home');
        }
      });
  }

  update() {
    if (this.musicianForm.valid) {
      const submittedMusician = this.musicianForm.value;
      submittedMusician.id = this.musician.id;
      submittedMusician.user = submittedMusician.user['@id'];

      delete submittedMusician.instrument;
      delete submittedMusician.createdAt;
      delete submittedMusician.updatedAt;

      this.musicianService.save(submittedMusician).subscribe(result => {
        if (result['@id']) {
          this.store.dispatch(new AttachMusician(result));
          this.toggleMode({ checked: false });
          this.snackBar.displaySaveSuccess(result);
        }
      });
    }
  }

  private initForm() {
    this.musicianForm = this.formBuilder.group({
      user: [this.member],
      instrument: [this.instrument.name],
      createdAt: [this.datePipe.transform(this.musician.createdAt, 'medium')],
      updatedAt: [this.datePipe.transform(this.musician.updatedAt, 'medium')],
    });
  }
}
