import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-worksheet',
  templateUrl: './general-worksheet.component.html',
  styleUrls: ['./general-worksheet.component.scss']
})
export class GeneralWorksheetComponent implements OnInit {

  message = 'Ici seront affichées des informations spécifiques au morceau et communes à tous ses musiciens !';
  todos = [
    'Liste historisée des enregistrements de cette musique',
    'Nota Benes des musiciens épinglées',
    'Dernières modifications du contenu ( Quoi, quand )',
  ];

  constructor() { }

  ngOnInit() {
  }

}
