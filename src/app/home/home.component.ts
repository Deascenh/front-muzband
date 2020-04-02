import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message = 'Bienvenue sur la page d\'accueil de MuzBand. Elle est au \
    "centre" de l\'application, vous y retrouverez ici tout \
    un tas d\'informations sur le groupe et ses musiques !';
  todos = [
    'Liste historisée des derniers ajouts de contenu',
    'Des notes de membres',
  ];
  constructor() { }

  ngOnInit() {
  }

}
