import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statsPokemon'
})
export class StatsPokemonPipe implements PipeTransform {

  transform(response: any[]) {

    const stats: any = [
      {
        name: 'PS',
        value: 0
      },
      {
        name: 'ataque',
        value: 0
      },
      {
        name: 'defensa',
        value: 0
      },
      {
        name: 'velocidad',
        value: 0
      },
      {
        name: 'ataque especial',
        value: 0
      },
      {
        name: 'defensa especial',
        value: 0
      }
    ];

    response.map(stat => {
      switch (stat.stat.name) {
        case 'hp':
          stats[0].value = stat.base_stat;
          break;
        case 'attack':
          stats[1].value = stat.base_stat;
          break;
        case 'defense':
          stats[2].value = stat.base_stat;
          break;
        case 'speed':
          stats[3].value = stat.base_stat;
          break;
        case 'special-attack':
          stats[4].value = stat.base_stat;
          break;
        case 'special-defense':
          stats[5].value = stat.base_stat;
          break;
        default:
          break;
      }
    });

    return stats;

  }
}





