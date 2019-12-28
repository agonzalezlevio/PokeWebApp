import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flavorTextToSpanish'
})
export class FlavorTextToSpanish implements PipeTransform {

  transform(value: any[]): string {
    return this.getTranslatedName(value);
  }

  public getTranslatedName(list: any[]) {
    for (const value of list) {
      if (value.language.name === 'es') {
        return value.flavor_text;
      }
    }
  }


}
