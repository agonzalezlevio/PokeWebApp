import { Component, OnInit, Input } from '@angular/core';


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


}
