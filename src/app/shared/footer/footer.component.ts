import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public autor: any;
  public year: number;

  constructor() { }

  ngOnInit() {
    this.autor = {
      nombre: 'Alejandro',
      apellido: 'González'
    };

    this.year = new Date().getFullYear();
  }

}
