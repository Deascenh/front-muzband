import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-sheet',
  templateUrl: './music-sheet.component.html',
  styleUrls: ['./music-sheet.component.scss']
})
export class MusicSheetComponent implements OnInit {

  message = 'Ici seront affichées des informations spécifiques au morceau et communes à tous ses musiciens !';
  todos = [
    'Lecture et édition des infos de la musique',
    'Fonctionnalité de suppression (archivage [delete soft])',
    'Liste historisée des enregistrements de cette musique',
    'Nota Benes des musiciens épinglées',
    'Dernières modifications du contenu ( Quoi, quand )',
  ];

  constructor() { }

  ngOnInit() {
  }

}