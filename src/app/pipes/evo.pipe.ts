import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'evoChain'
})
export class EvoPokemonPipe implements PipeTransform {

  transform(response: string) {

    const evolutionDetails: any = response;
    const evolutions: any[] = [];

    const numeroEvoluciones = evolutionDetails.evolves_to.length;

    let data = evolutionDetails;

    while (data) {
      if (numeroEvoluciones > 1) {
        // Primer pokémon
        if (data.evolves_to.length !== 0) {
          evolutions.push({
            name: data.species.name,
            id: this.getIDfromURL(data.species.url)
          });
        }
        // Resto de evoluciones especiales
        for (const evo of data.evolves_to) {
          evolutions.push({
            name: evo.species.name,
            id: this.getIDfromURL(evo.species.url)
          });
        }
      } else {
        // evoluciones normales
        evolutions.push({
          name: data.species.name,
          id: this.getIDfromURL(data.species.url)
        });
      }
      data = data.evolves_to[0];
    }

    return evolutions;
  }


  private getIDfromURL(url: string): number {
    const cleanURL = url.slice(0, -1);
    return Number(cleanURL.substr(cleanURL.lastIndexOf('/') + 1));
  }

}
