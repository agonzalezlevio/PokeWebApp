import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { PokemonImagenPipe } from './pokemonImagen.pipe';
import { TypeToSpanishPipe } from './type-to-spanish.pipe';
import { FlavorTextToSpanish } from './flavorText-to-Spanish.pipe';


@NgModule({
  declarations: [
    CapitalizePipe,
    PokemonImagenPipe,
    TypeToSpanishPipe,
    FlavorTextToSpanish
  ],
  imports: [
  ],
  exports: [
    CapitalizePipe,
    PokemonImagenPipe,
    TypeToSpanishPipe,
    FlavorTextToSpanish
  ]
})
export class PipesModule { }
