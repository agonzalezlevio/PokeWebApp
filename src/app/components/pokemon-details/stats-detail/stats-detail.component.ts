import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-stats-detail',
  templateUrl: './stats-detail.component.html',
  styleUrls: ['./stats-detail.component.css']
})
export class StatsDetailComponent implements OnInit, OnChanges {


  @Input() stats: any[];


  public statsList: any = [
    { name: 'puntos de salud', value: 0, id: 'hp' },
    { name: 'ataque', value: 0, id: 'attack' },
    { name: 'defensa', value: 0, id: 'defense' },
    { name: 'velocidad', value: 0, id: 'speed' },
    { name: 'ataque especial', value: 0, id: 'spatk' },
    { name: 'defensa especial', value: 0, id: 'spdef' }
  ];

  constructor() { }


  ngOnChanges() {
    this.setStatInList(this.stats);
  }

  ngOnInit() {

  }

  public setStatInList(stats: any[]) {
    stats.map(resp => {
      const statsResult = resp;
      switch (statsResult.stat.name) {
        case 'hp':
          this.statsList[0].value = statsResult.base_stat;
          break;
        case 'attack':
          this.statsList[1].value = statsResult.base_stat;
          break;
        case 'defense':
          this.statsList[2].value = statsResult.base_stat;
          break;
        case 'speed':
          this.statsList[3].value = statsResult.base_stat;
          break;
        case 'special-attack':
          this.statsList[4].value = statsResult.base_stat;
          break;
        case 'special-defense':
          this.statsList[5].value = statsResult.base_stat;
          break;
        default:
          break;
      }
    });
    this.setNomalizedValues(this.statsList);
  }


  public setNomalizedValues(list: any[]){
    const values: number[] = list.map( result => result.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values) * 0.1; //  Es Math.min(...values) pero se multiplica por 0.1 solo para efectos visuales de la barra cuando se normalize... ya que el mínimo será 0 y no se verá progreso
    this.statsList.map((result: any) => result.normalized = this.normalized(result.value, minValue, maxValue));
  }


  public normalized(value: number, minValue: number, maxValue: number) {
    return Math.round((Math.abs((value - minValue) / (maxValue - minValue))) * 100);
  }

}
