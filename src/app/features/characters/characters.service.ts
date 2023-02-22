import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Characters, DataCharacter, ResultCharacter } from './interfaces/character.interface';
import { environment } from 'src/environments/environment';
import { CoreMarvelService } from 'src/app/core/services/core.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private url = environment.baseUrl; // Url base de la API de Marvel
  private apiKey = environment.apiKey; // Clave de la API de Marvel
  private timeStamp = environment.timeStamp; // TimeStamp para la validación de la API de Marvel
  private hasValue = environment.hasValue; // Hash para la validación de la API de Marvel

  constructor(private http: HttpClient, private coreServices: CoreMarvelService) { }

  /**
   * Método para obtener la lista de personajes.
   * @param limit límite de personajes a obtener.
   * @param offset valor de desplazamiento para paginación.
   * @param searchTerms término de búsqueda para filtrar por nombre.
   * @returns devuelve un Observable que emite los datos de los personajes.
   */
  getCharacters(limit: number, offset: number, searchTerms: string): Observable<DataCharacter> {
    let options = new HttpParams()
      .set('limit', `${limit}`)
      .set('offset', `${offset}`)
      .set('ts', `${this.timeStamp}`)
      .set('hash', `${this.hasValue}`)
      .set('apikey', `${this.apiKey}`);

    if (searchTerms.length > 0) {
      options = options.set('nameStartsWith', `${searchTerms}`);
    }

    return this.http.get<Characters>(`${this.url}/characters`, { params: options, }).pipe(
      map(response => {
        return response.data;
      }),
      catchError(this.coreServices.handleError));
  }

  /**
   * Método para obtener un personaje por su id.
   * @param id id del personaje a obtener.
   * @returns devuelve un Observable que emite los datos del personaje.
   */
  getCharacterById(id: number): Observable<ResultCharacter> {
    let options = new HttpParams()
      .set('ts', `${this.timeStamp}`)
      .set('hash', `${this.hasValue}`)
      .set('apikey', `${this.apiKey}`);

    return this.http.get<Characters>(`${this.url}/characters/${id}`, { params: options, }).pipe(
      map(response => {
        return response.data.results[0];
      }),
      catchError(this.coreServices.handleError));
  }

}
