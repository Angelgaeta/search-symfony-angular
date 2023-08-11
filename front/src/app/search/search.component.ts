// search.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup; // Formulaire de recherche
  error: boolean = false; // Flag pour gérer les erreurs
  test: any[] = []; // Données JSON
  searchResults: string[] = []; // Tableau pour stocker les résultats de la recherche
  private _jsonUrl = 'assets/db.json'; // URL du fichier JSON local

  // Injecter FormBuilder et HttpClient via le constructeur
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient // Utilisation de l'API HTTP d'Angular pour les requêtes
  ) {}

  // Fonction pour récupérer les données JSON
  public getJSON(): Observable<any> {
    return this.http.get(this._jsonUrl); // Récupération des données JSON via HTTP
  }

  /**
   Initialisation lors du chargement du composant  
   */
  ngOnInit(): void {
    this.initsearchForm(); // Initialisation du formulaire de recherche
    this.getJSON().subscribe((data) => {
      this.test = data; // Stockage des données JSON pour une utilisation ultérieure
    });
  }

  /**
   * Initialiser le formulaire avec FormBuilder
   */
  initsearchForm(): void {
    this.searchForm = this.formBuilder.group({
      lieu: [''], // Champ "lieu"
      event: [''], // Champ "event"
    });
  }

  /**
   * Gestion de la soumission du formulaire
   */
  onsubmitSearchForm(): void {
    // Utilisation de la déstructuration pour extraire les valeurs des champs
    const { lieu: searchLieu, event: searchEvent } = this.searchForm.value;
    // const searchLieu = this.searchForm.value.lieu; // Valeur du champ "lieu"
    // const searchEvent = this.searchForm.value.event; // Valeur du champ "event"

    // Vérification si les deux champs sont vides
    if (!searchLieu && !searchEvent) {
      this.error = true; // Afficher une erreur si c'est le cas
      return;
    }

    // Réinitialiser la variable d'erreur
    this.error = false;

    // Filtrer les événements selon la ville et le nom de l'événement
    const eventsInCity = this.test.filter((el) => el.city === searchLieu);
    const specificEvent = this.test.filter(
      (el) => el.eventName === searchEvent
    );

    // Évaluation des résultats filtrés et détermination de l'action à suivre
    if (specificEvent.length && eventsInCity.length) {
      console.log(eventsInCity);
      alert('cas 1');
    } else if (!specificEvent.length && eventsInCity.length) {
      console.log(eventsInCity);
      alert('cas 2');
    } else if (specificEvent.length && !eventsInCity.length) {
      console.log(specificEvent);
      alert('cas 3');
    } else {
      console.log('pas de résultat');
      alert('cas 4');
    }
  }
}
