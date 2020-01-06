import { Component, OnInit, Input } from '@angular/core';
import { COLOURS } from 'src/app/interfaces/colorPokemon.enum';

@Component({
  selector: 'app-moves-detail-table',
  templateUrl: './moves-detail-table.component.html',
  styleUrls: ['./moves-detail-table.component.css']
})
export class MovesDetailTableComponent implements OnInit {


  @Input() movesList: any [];
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }


  public getTypeColour(type: string) {
    if (type) {
      return '#' + COLOURS[type];
    }
  }


}
