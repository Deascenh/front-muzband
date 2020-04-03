import {Component, Inject} from '@angular/core';
import {Instrument} from '../../core/models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {AppSnackbarService} from '../../core/utils/app-snackbar.service';
import {Store} from '@ngrx/store';
import {IAppState} from '../../core/store/App/App.state';
import {InstrumentService} from '../../core/data/instrument.service';
import {AppendToInstruments} from '../../core/store/instrument/instrument.actions';

export interface InstrumentSheetData {
  instrument: Instrument | null;
}

@Component({
  selector: 'app-instrument-sheet',
  templateUrl: './instrument-sheet.component.html',
  styleUrls: ['./instrument-sheet.component.scss']
})
export class InstrumentSheetComponent {
  instrumentForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  private pHydrated: Instrument;

  get instrument(): Instrument {
    return this.pHydrated;
  }

  set instrument(value: Instrument) {
    if (value instanceof Instrument) {
      this.pHydrated = value;
      this.patchInstrumentForm(value);
    }
  }

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: InstrumentSheetData,
    public bottomSheetRef: MatBottomSheetRef<InstrumentSheetComponent>,
    private snackBar: AppSnackbarService,
    private store: Store<IAppState>,
    private instrumentService: InstrumentService,
  ) {
    if (data.instrument !== null) {
      this.instrument = data.instrument;
    }
  }

  onSubmit() {
    const submittedInstrument: Instrument = this.instrumentForm.value;
    if (this.instrument) {
      submittedInstrument.id = this.instrument.id;
    }

    this.instrumentService.save(submittedInstrument).subscribe(result => {
      if (result['@id']) {
        this.store.dispatch(new AppendToInstruments(result));
        this.bottomSheetRef.dismiss();
      }
      if (this.instrument) {
        this.snackBar.displaySaveSuccess(result);
      }
    });
  }

  private patchInstrumentForm(value: Instrument) {
    this.instrumentForm.patchValue({
      name: value.name,
    });
  }
}
