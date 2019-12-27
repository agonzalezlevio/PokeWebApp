import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { PokemonImagenPipe } from './pokemonImagen.pipe';




@NgModule({
  declarations: [
    CapitalizePipe,
    PokemonImagenPipe
  ],
  imports: [
  ],
  exports: [
    CapitalizePipe,
    PokemonImagenPipe
  ]
})
export class PipesModule { }