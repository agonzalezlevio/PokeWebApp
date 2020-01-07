import { NgModule } from '@angular/core';
import { PokemonImagePipe } from './pokemonImage.pipe';
import { TypeToSpanishPipe } from './type-to-spanish.pipe';
import { FlavorTextToSpanish } from './flavorText-to-Spanish.pipe';
import { NameTextToSpanish } from './nameText-to-Spanish.pipe';
import { TypeColorPipe } from './typeColor.pipe';


@NgModule({
  declarations: [
    PokemonImagePipe,
    TypeToSpanishPipe,
    FlavorTextToSpanish,
    NameTextToSpanish,
    TypeColorPipe
  ],
  imports: [
  ],
  exports: [
    PokemonImagePipe,
    TypeToSpanishPipe,
    FlavorTextToSpanish,
    NameTextToSpanish,
    TypeColorPipe
  ]
})
export class PipesModule { }
