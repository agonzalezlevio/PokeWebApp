import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stats-detail-item',
  templateUrl: './stats-detail-item.component.html',
  styleUrls: ['./stats-detail-item.component.css']
})
export class StatsDetailItemComponent implements OnInit {

  @Input() stat: string;
  @Input() value: number;
  @Input() statID: string;
  @Input() valueGraph: number;

  constructor() { }

  ngOnInit() {
  }

}
