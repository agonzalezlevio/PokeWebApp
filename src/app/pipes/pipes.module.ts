import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { PokemonImagePipe } from './pokemonImage.pipe';
import { TypeToSpanishPipe } from './type-to-spanish.pipe';
import { FlavorTextToSpanish } from './flavorText-to-Spanish.pipe';
import { NameTextToSpanish } from './nameText-to-Spanish.pipe';


@NgModule({
  declarations: [
    CapitalizePipe,
    PokemonImagePipe,
    TypeToSpanishPipe,
    FlavorTextToSpanish,
    NameTextToSpanish
  ],
  imports: [
  ],
  exports: [
    CapitalizePipe,
    PokemonImagePipe,
    TypeToSpanishPipe,
    FlavorTextToSpanish,
    NameTextToSpanish
  ]
})
export class PipesModule { }
