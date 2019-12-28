import { Pipe, PipeTransform } from '@angular/core';
import { TYPE_POKEMON_SPANISH } from '../interfaces/typeSpanish.enum';

@Pipe({
  name: 'typeToSpanish'
})
export class TypeToSpanishPipe implements PipeTransform {

  transform(type: string): any {
    return TYPE_POKEMON_SPANISH[type];
  }

}
