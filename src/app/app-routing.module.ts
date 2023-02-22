import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersListComponent } from './features/characters/pages/characters-list/characters-list.component';
import { SearchComponent } from './features/characters/pages/search/search.component';
import { CharacterDetailsComponent } from './features/characters/pages/character-details/character-details.component';

const routes: Routes = [
  {
    path: 'characters', component: CharactersListComponent,
  },
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: '**', component: CharactersListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
