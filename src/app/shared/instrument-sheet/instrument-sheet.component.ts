import {Component, OnInit} from '@angular/core';
import {Instrument} from '../../core/models';

export interface InstrumentSheetData {
  instrument: Instrument | null;
}

@Component({
  selector: 'app-instrument-sheet',
  templateUrl: './instrument-sheet.component.html',
  styleUrls: ['./instrument-sheet.component.scss']
})
export class InstrumentSheetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
