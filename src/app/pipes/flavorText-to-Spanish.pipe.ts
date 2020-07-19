import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flavorTextToSpanish'
})
export class FlavorTextToSpanish implements PipeTransform {

  transform(value: any[], type?: string): string {
    return this.getTranslatedName(value, type);
  }

  public getTranslatedName(list: any[], type: string) {
    if( type == 'genus') {
      return list.filter(obj => obj.language.name == 'es')[0].genus;
    } else {
      for (const value of list) {
        if (value.language.name === 'es') {
          return value.flavor_text;
        }
      }
    }
  }

}
