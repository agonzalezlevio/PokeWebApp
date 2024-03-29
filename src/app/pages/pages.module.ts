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
import { TypeRelationsDetailComponent } from '../components/pokemon-details/type-relations-detail/type-relations-detail.component';
import { TypeRelationsDetailItemComponent } from '../components/pokemon-details/type-relations-detail-item/type-relations-detail-item.component';
import { StatsDetailComponent } from '../components/pokemon-details/stats-detail/stats-detail.component';
import { StatsDetailItemComponent } from '../components/pokemon-details/stats-detail-item/stats-detail-item.component';
import { BasicsDetailComponent } from '../components/pokemon-details/basics-detail/basics-detail.component';
import { SpeciesDetailComponent } from '../components/pokemon-details/species-detail/species-detail.component';
import { AbilitiesDetailComponent } from '../components/pokemon-details/abilities-detail/abilities-detail.component';


// Modules
import { PipesModule } from '../pipes/pipes.module';
import { MovesDetailComponent } from '../components/pokemon-details/moves-detail/moves-detail.component';
import { MovesDetailTableComponent } from '../components/pokemon-details/moves-detail-table/moves-detail-table.component';





@NgModule({
  declarations: [
    CardPokemonComponent,
    LoadingComponent,
    HomeComponent,
    SearchComponent,
    NotFoundPokemonComponent,
    PokemonComponent,
    EvolutionDetailComponent,
    TypeRelationsDetailComponent,
    TypeRelationsDetailItemComponent,
    StatsDetailComponent,
    StatsDetailItemComponent,
    BasicsDetailComponent,
    SpeciesDetailComponent,
    AbilitiesDetailComponent,
    MovesDetailComponent,
    MovesDetailTableComponent
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