import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameTextToSpanish'
})
export class NameTextToSpanish implements PipeTransform {

  transform(value: any[]): string {
    return this.getTranslatedName(value);
  }

  public getTranslatedName(list: any[]) {
    for (const value of list) {
      if (value.language.name === 'es') {
        return value.name;
      }
    }
  }


}
