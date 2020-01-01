import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'evoChain'
})
export class EvoPokemonPipe implements PipeTransform {

  transform(response: string) {

    let evoData: any = response;

    const evoChain: any = [];
    const numeroEvoluciones = evoData.evolves_to.length;

    do {

      const evoDetails = evoData.evolution_details[0]; // Pronto se usará
      evoChain.push({
        name: evoData.species.name,
        id: this.getIDfromURL(evoData.species.url),
      });

      if (numeroEvoluciones > 1) {
        for (const evo of evoData.evolves_to) {
          evoChain.push({
            name: evo.species.name,
            id: this.getIDfromURL(evo.species.url)
         });
        }
      }
      evoData = evoData.evolves_to[0];

    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

    return evoChain;

  }
  private getIDfromURL(url: string): number {
    const cleanURL = url.slice(0, -1);
    return Number(cleanURL.substr(cleanURL.lastIndexOf('/') + 1));
  }

}
