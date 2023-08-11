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
  searchForm!: FormGroup; // Déclaration du formulaire de recherche
  error: boolean = false;
  test: any[] = []; // Tableau pour stocker les données JSON
  searchResults: string[] = []; // Tableau pour stocker les résultats de la recherche
  private _jsonUrl = 'assets/db.json'; // URL du fichier JSON

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient // Utilisation de l'API HTTP d'Angular pour les requêtes
  ) {}

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonUrl); // Récupération des données JSON via HTTP
  }

  /**
   * Initialisation du composant Search lorsqu'il est chargé
   */
  ngOnInit(): void {
    this.initsearchForm(); // Initialisation du formulaire de recherche
    this.getJSON().subscribe((data) => {
      this.test = data; // Chargement des données JSON
    });
  }

  /**
   * Initialisation du champ "lieu" et "event" dans le formulaire de recherche
   */
  initsearchForm(): void {
    this.searchForm = this.formBuilder.group({
      lieu: [''], // Champ "lieu" avec validation requise
      event: [''], // Champ "event" avec validation requise
    });
  }

  /**
   * Gestion de la soumission du formulaire de recherche
   */
  onsubmitSearchForm(): void {
    // Récupération des valeurs de recherche pour le lieu et l'événement
    const searchLieu = this.searchForm.value.lieu; // Valeur du champ "lieu"
    const searchEvent = this.searchForm.value.event; // Valeur du champ "event"

    // Vérification si les deux champs sont vides
    if (!searchLieu && !searchEvent) {
      this.error = true; // Définir la variable d'erreur sur true
      return; // Si les deux champs sont vides, on ne fait rien
    }

    // Réinitialiser la variable d'erreur
    this.error = false;

    // Si le champ "lieu" est renseigné et que le champ "événement" est vide, affichez tous les événements de cette ville
    if (searchLieu && !searchEvent) {
      const eventsInCity = this.test.filter((el) => el.city === searchLieu);
      console.log('Événements dans la ville:', eventsInCity);
      return;
    }

    // Si le champ "lieu" est vide mais que le champ "événement" est renseigné, affichez l'événement spécifié peu importe la ville
    if (!searchLieu && searchEvent) {
      const specificEvent = this.test.filter(
        (el) => el.eventName === searchEvent
      );
      console.log('Événements spécifiques:', specificEvent);
      return;
    }

    // Recherche d'un événement correspondant au nom de recherche
    let foundEvent = this.test.find((el) => el.eventName === searchEvent);

    // Filtre des événements correspondant à la ville de recherche
    let foundCity = this.test.filter((el) => el.city === searchLieu);

    // Vérification si les deux champs sont non vides
    if (searchLieu && searchEvent) {
      // Conditions pour déterminer le résultat en fonction des recherches
      if (foundEvent && foundCity.length) {
        // Si un événement est trouvé ET des événements dans la ville sont trouvés
        console.log(foundEvent);
        alert('cas 1');
      } else if (!foundEvent && foundCity.length) {
        // Si aucun événement n'est trouvé, mais des événements dans la ville sont trouvés
        console.log(foundCity);
        alert('cas 2');
      } else if (foundEvent && !foundCity.length) {
        // Si un événement est trouvé, mais aucun événement dans la ville n'est trouvé
        console.log(foundEvent);
        alert('cas 3');
      } else {
        // Si ni un événement ni des événements dans la ville ne sont trouvés
        console.log('pas de résultat');
        alert('cas 4');
      }
    }
  }
}
