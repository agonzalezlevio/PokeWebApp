import { Component, OnInit, Input } from '@angular/core';


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


}
