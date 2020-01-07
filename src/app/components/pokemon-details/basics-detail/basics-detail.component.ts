import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-basics-detail',
  templateUrl: './basics-detail.component.html',
  styleUrls: ['./basics-detail.component.css']
})
export class BasicsDetailComponent implements OnInit {

  @Input() pokemon: any;

  constructor() { 
  }

  ngOnInit() {

  }


}
