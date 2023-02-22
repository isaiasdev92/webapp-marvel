import { Component } from '@angular/core';

import { EMPTY, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DataCharacter } from '../../interfaces/character.interface';
import { CharacteruiInterface } from '../../interfaces/character.ui.interface';
import { CharactersService } from '../../characters.service';
import { MatDialog } from '@angular/material/dialog';
import { CharacterDetailsComponent } from '../character-details/character-details.component';



@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.componente.css']
})
export class CharactersListComponent {

  private sizePage = 20;
  private take = 0;
  searchTerms = new Subject<string>();
  characters: CharacteruiInterface[] = [];
  isLoading = true;
  isFirstLoading = true;
  sum = 100;
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;
  totalCharacters = 0;
  totalLoadView = 0;

  /**
   * El constructor del componente.
   *
   * @param charactersServices: Servicio que maneja las operaciones de personajes.
   * @param dialog: Servicio que maneja la apertura de diálogos modales.
   */
  constructor(private charactersServices: CharactersService, public dialog: MatDialog) { }

  /**
   * Función que se ejecuta cuando se inicializa el componente.
   * Carga los personajes y se suscribe a los cambios en la búsqueda de personajes.
   */
  ngOnInit(): void {
    this.isLoading = true;
    this.isFirstLoading = true;

    this.getCharacters(this.sizePage, this.take);
    this.getCharactersSearch();
  }

  /**
   * Función que se ejecuta cuando se detecta un evento "scroll down".
   * Incrementa la cantidad de resultados que se toman y carga más personajes.
   *
   * @param ev: El evento de "scroll down".
   */
  onScrollDown(ev: any) {
    this.take += this.sizePage;
    this.getCharacters(this.take, this.sizePage);

  }

  /**
   * Función que se ejecuta cuando el usuario ingresa una cadena de búsqueda.
   * Emite la cadena de búsqueda al observable "searchTerms".
   *
   * @param searchValue: La cadena de búsqueda ingresada por el usuario.
   */
  onSearch(searchValue: string) {
    this.searchTerms.next(searchValue);
  }


  /**
   * Función que carga los personajes desde el servicio.
   *
   * @param sizePage: Tamaño de página para la paginación de resultados.
   * @param take: Cantidad de resultados a tomar.
   */
  private getCharacters(sizePage: number, take: number) {
    this.charactersServices.getCharacters(sizePage, take, "").pipe(
      catchError(() => {
        this.isLoading = false;

        if (this.isFirstLoading) {
          this.sizePage = 10;
          this.isFirstLoading = false;
        }
        return EMPTY;
      })

    ).subscribe((response) => {
      this.handleResponse(response);
    });
  }

  /**
   * Obtiene una lista de personajes de la API de personajes basada en una cadena de búsqueda y la procesa en la interfaz de usuario.
   *
   * @returns Nada. Agrega los resultados a la propiedad `characters`.
   *
   * @remarks
   * Esta función se suscribe al observable `searchTerms`, que emite una cadena de búsqueda cada vez que el usuario escribe algo en un campo de búsqueda. La función utiliza la cadena de búsqueda para recuperar una lista de personajes de la API de personajes y la procesa en la interfaz de usuario.
   * Si se produce un error, se establece la propiedad `isLoading` en `false`.
   */
  private getCharactersSearch() {

    this.searchTerms.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((terms: string) => {
        this.isLoading = true;
        return this.charactersServices.getCharacters(this.sizePage, this.take, terms).pipe(
          catchError(() => {
            this.isLoading = false;
            return EMPTY;
          })
        );
      })).subscribe(data => this.handleResponse(data, true));
  }

  /**
   * Procesa los datos de la lista de personajes y los agrega a la interfaz de usuario.
   *
   * @param response - El objeto de respuesta de la API de personajes
   * @param reset - Si se debe restablecer la lista de personajes antes de agregar los nuevos elementos
   *
   * @returns Nada. Agrega los resultados a la propiedad `characters`.
   *
   * @remarks
   * Esta función toma el objeto de respuesta de la API de personajes y lo procesa para su uso en la interfaz de usuario.
   * Si la respuesta está vacía, establece la propiedad `characters` en un array vacío. Si se debe restablecer la lista de personajes antes de agregar los nuevos elementos, se establece la propiedad `characters` en un array vacío. Para cada personaje, se crea un nuevo objeto `CharacteruiInterface` y se agrega a la propiedad `characters`.
   * También establece la propiedad `totalLoadView` en la longitud actual de la propiedad `characters`.
   */
  handleResponse(response: DataCharacter, reset: boolean = false) {
    console.log(response);
    this.isLoading = false;

    if (this.isFirstLoading) {
      this.sizePage = 10;
      this.isFirstLoading = false;
    }

    this.totalCharacters = response.total;

    if (response.results.length === 0) {
      this.characters = []
      return;
    }

    if (reset) {
      this.characters = [];
    }

    response.results.map((item) => {
      const newCharacter: CharacteruiInterface = {
        id: item.id,
        name: item.name,
        description: item.description,
        modified: item.modified,
        thumbnailUrl: `${item.thumbnail.path}.${`${item.thumbnail.extension}`}`
      };
      this.characters.push(newCharacter);
      this.totalLoadView = this.characters.length;
    });
  }

  /**
  
  Abre un cuadro de diálogo que muestra los detalles del personaje seleccionado.
  @param characterId El identificador del personaje para el cual se mostrarán los detalles.
  */
  openDialog(characterId: number) {
    this.dialog.open(CharacterDetailsComponent, {
      data: characterId
    });
  }
}
