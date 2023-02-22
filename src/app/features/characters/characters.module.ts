import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharactersListComponent } from './pages/characters-list/characters-list.component';
import { SearchComponent } from './pages/search/search.component';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from '../../app.module';
import { LoadingComponent } from './componets/loading/loading.component';


@NgModule({
  declarations: [
    CharactersListComponent,
    CharacterDetailsComponent,
    SearchComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    HttpClientModule,
  ]
})
export class CharactersModule { }
