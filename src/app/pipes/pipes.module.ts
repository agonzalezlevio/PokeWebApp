import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { PokemonImagenPipe } from './pokemonImagen.pipe';
import { TypeToSpanishPipe } from './type-to-spanish.pipe';


@NgModule({
  declarations: [
    CapitalizePipe,
    PokemonImagenPipe,
    TypeToSpanishPipe
  ],
  imports: [
  ],
  exports: [
    CapitalizePipe,
    PokemonImagenPipe,
    TypeToSpanishPipe
  ]
})
export class PipesModule { }