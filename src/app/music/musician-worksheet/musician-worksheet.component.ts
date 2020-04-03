import {Component, Input, OnInit} from '@angular/core';
import {Instrument, User} from '../../core/models';

export interface MusicianWorksheetData {
  instrument: string | Instrument;
  user: User | undefined;
}

@Component({
  selector: 'app-musician-worksheet',
  templateUrl: './musician-worksheet.component.html',
  styleUrls: ['./musician-worksheet.component.scss']
})
export class MusicianWorksheetComponent implements OnInit {
  message = 'Vous trouverez bientôt à cet endroit la feuille de travail d\'un musicien et son instrument !';
  todos = [
    'Lecture et édition des infos de la feuille de travail',
    'Suppression du musicien et sa feuille de travail [delete hard]',
  ];
  @Input() data: MusicianWorksheetData;

  constructor() { }

  ngOnInit() {
  }

}
