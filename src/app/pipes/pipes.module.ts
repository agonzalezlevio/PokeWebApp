import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { PokemonImagenPipe } from './pokemonImagen.pipe';
import { TypeToSpanishPipe } from './type-to-spanish.pipe';
import { FlavorTextToSpanish } from './flavorText-to-Spanish.pipe';
import { EvoPokemonPipe } from './evo.pipe';
import { StatsPokemonPipe } from './stats.pipe';


@NgModule({
  declarations: [
    CapitalizePipe,
    PokemonImagenPipe,
    TypeToSpanishPipe,
    FlavorTextToSpanish,
    EvoPokemonPipe,
    StatsPokemonPipe
  ],
  imports: [
  ],
  exports: [
    CapitalizePipe,
    PokemonImagenPipe,
    TypeToSpanishPipe,
    FlavorTextToSpanish,
    EvoPokemonPipe,
    StatsPokemonPipe
  ]
})
export class PipesModule { }
