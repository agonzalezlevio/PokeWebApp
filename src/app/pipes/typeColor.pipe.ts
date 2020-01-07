import { Pipe, PipeTransform } from '@angular/core';
import { TYPE_POKEMON_COLOURS } from 'src/app/interfaces/colorPokemon.enum';

@Pipe({
  name: 'typeColor'
})
export class TypeColorPipe implements PipeTransform {

  transform(type: string): any {
    return this.getTypeColour(type);
  }

  private getTypeColour(type: string) {
    if (type) {
      return '#' + TYPE_POKEMON_COLOURS[type];
    }
  }
}
