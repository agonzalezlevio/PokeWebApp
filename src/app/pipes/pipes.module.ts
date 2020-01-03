import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { PokemonImagenPipe } from './pokemonImagen.pipe';
import { TypeToSpanishPipe } from './type-to-spanish.pipe';
import { FlavorTextToSpanish } from './flavorText-to-Spanish.pipe';
import { EvoPokemonPipe } from './evo.pipe';


@NgModule({
  declarations: [
    CapitalizePipe,
    PokemonImagenPipe,
    TypeToSpanishPipe,
    FlavorTextToSpanish,
    EvoPokemonPipe
  ],
  imports: [
  ],
  exports: [
    CapitalizePipe,
    PokemonImagenPipe,
    TypeToSpanishPipe,
    FlavorTextToSpanish,
    EvoPokemonPipe
  ]
})
export class PipesModule { }
