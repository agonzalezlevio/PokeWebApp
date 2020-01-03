import { Component, OnInit, Input } from '@angular/core';
import { COLOURS } from 'src/app/interfaces/colorPokemon.enum';

@Component({
  selector: 'app-type-relations-detail-item',
  templateUrl: './type-relations-detail-item.component.html',
  styleUrls: ['./type-relations-detail-item.component.css']
})
export class TypeRelationsDetailItemComponent implements OnInit {


  @Input() leyenda: any;
  @Input() types: any[];


  constructor() { }

  ngOnInit() {}


  public getTypeColour(type: string) {
    if (type) {
      return '#' + COLOURS[type];
    }
  }

}
