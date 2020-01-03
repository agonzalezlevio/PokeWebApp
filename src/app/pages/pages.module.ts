import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routes
import { PAGE_ROUTES } from './pages.routes';

// Components
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { CardPokemonComponent } from '../components/card-pokemon/card-pokemon.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { NotFoundPokemonComponent } from '../components/not-found-pokemon/not-found-pokemon.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { EvolutionDetailComponent } from '../components/pokemon-details/evolution-detail/evolution-detail.component';
import { EffectivenessDetailComponent } from '../components/pokemon-details/effectiveness-detail/effectiveness-detail.component';
import { TypesPokemonComponent } from '../components/types-pokemon/types-pokemon.component';


// Modules
import { PipesModule } from '../pipes/pipes.module';




@NgModule({
  declarations: [
    CardPokemonComponent,
    LoadingComponent,
    HomeComponent,
    SearchComponent,
    NotFoundPokemonComponent,
    PokemonComponent,
    EvolutionDetailComponent,
    EffectivenessDetailComponent,
    TypesPokemonComponent
  ],
  imports: [
    PAGE_ROUTES,
    CommonModule,
    PipesModule
  ],
  exports: [
    HomeComponent,
    SearchComponent
  ]
})
export class PagesModule { }