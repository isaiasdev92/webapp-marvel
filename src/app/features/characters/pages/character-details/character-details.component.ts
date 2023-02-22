import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, EMPTY } from 'rxjs';
import { CharactersService } from '../../characters.service';
import { CharacteruiInterface } from '../../interfaces/character.ui.interface';


@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.componente.css']
})
export class CharacterDetailsComponent {
  isLoading = true;
  character: CharacteruiInterface = {
    id: 0,
    name: "---",
    thumbnailUrl: "assets/no-image.png.png",
    modified: "---",
    description: "---"
  };


  constructor(@Inject(MAT_DIALOG_DATA) private data: number, private charactersServices: CharactersService) { }

  /**
   * Método que se ejecuta al iniciar el componente
   * Se encarga de obtener los detalles del personaje a partir de su identificador y asignarlos a la propiedad 'character'
   * Si ocurre un error al obtener los datos del personaje, se establece la propiedad 'isLoading' en 'false' y se muestra un mensaje de error
*/
  ngOnInit(): void {
    this.isLoading = true;
    this.charactersServices.getCharacterById(this.data).pipe(
      catchError(() => {
        this.isLoading = false;
        console.log("ERROR!")

        return EMPTY;
      })

    ).subscribe((response) => {
      console.log("RESPONDIO");
      this.isLoading = false;
      console.log("DETALLES: ", response);
      const newCharacter: CharacteruiInterface = {
        id: response.id,
        name: response.name,
        description: response.description,
        modified: response.modified,
        thumbnailUrl: `${response.thumbnail.path}.${`${response.thumbnail.extension}`}`
      };
      this.character = newCharacter;
    });
  }
}
