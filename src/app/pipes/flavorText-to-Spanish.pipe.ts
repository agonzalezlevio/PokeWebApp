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
      return this.lastItem(list.filter(obj => obj.language.name == 'es')).genus;
    } else {
      return this.lastItem(list.filter(obj => obj.language.name == 'es')).flavor_text;
    }
  }

  public lastItem = (list: any[]) => list[list.length-1];


}
