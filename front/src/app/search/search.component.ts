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
      this.test = data; // Remplacement de la boucle for par une simple assignation des données JSON
    });
  }

  /**
   * Initialisation du champ "lieu" et "event" dans le formulaire de recherche
   */
  initsearchForm(): void {
    this.searchForm = this.formBuilder.group({
      lieu: ['', Validators.required], // Champ "lieu" avec validation requise
      event: ['', Validators.required], // Champ "event" avec validation requise
    });
  }

  /**
   * Gestion de la soumission du formulaire de recherche
   */
  onsubmitSearchForm(): void {
    let searchLieu = this.searchForm.value.lieu; // Récupération de la valeur de recherche
    let searchEvent = this.searchForm.value.event;

    if (searchLieu || searchEvent) {
      // Si au moins un des deux champs est rempli
      const results: string[] = [];

      for (let item of this.test) {
        let cityFound = false; // Variable pour vérifier si une ville correspondante a été trouvée
        let eventFound = false;

        if (item.city === searchLieu) {
          console.log(item.name);
          cityFound = true;
        }
        if (item.name === searchEvent || searchEvent === null) {
          console.log(item.name);
          eventFound = true;
          // Vérifie si la valeur des deux éléments sont égaux ou non
          // cityFound = true; // Une ville correspondante a été trouvée, alors on vérifie l'événement
          // if (event.name === searchEvent){
          // }
          // results.push(city.name);

          // Sortir de la boucle intérieure une fois qu'une ville est trouvée

          // if (!searchEvent || this.eventExists(city, searchEvent)) {
          //   // Si l'événement n'est pas spécifié ou s'il existe dans la ville
          //   results.push(city.name);
        }
        if ((cityFound = false) && (eventFound = false)) {
          console.log('Veuillez faire votre recherche');
        }

        // break;
      }
    }
  }
}

//       this.searchResults = results;
//     }
//   }
// }
