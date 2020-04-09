import {Component, Input, OnInit} from '@angular/core';
import {Instrument, Musician, User} from '../../core/models';

export interface MusicianWorksheetData {
  instrument: Instrument | undefined;
  member: User | undefined;
  musician: Musician;
}

@Component({
  selector: 'app-musician-worksheet',
  templateUrl: './musician-worksheet.component.html',
  styleUrls: ['./musician-worksheet.component.scss']
})
export class MusicianWorksheetComponent implements OnInit {
  message = 'Vous trouverez bientôt à cet endroit la feuille de travail d\'un musicien et son instrument !';
  todos = [
    'Faites vos suggestions !',
    'Nota Benes personnelles devant apparaître en évidence'
  ];
  @Input() data: MusicianWorksheetData;

  constructor() { }

  ngOnInit() {
  }

}
