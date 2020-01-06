import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-moves-detail',
  templateUrl: './moves-detail.component.html',
  styleUrls: ['./moves-detail.component.css']
})
export class MovesDetailComponent implements OnInit {


  /**
   * 
   * Por optimizar
   * 
   */


  public moves: any[];

  public tutorMove: any[]; // Movimientos por tutor
  public levelUpMove: any[]; // Movimientos Naturales
  public eggMove: any[]; // Movimientos por herencia (Huevo)
  public machineMove: any[]; // Movimientos por máquina 

  public generationSelected: string = '';
  public generationList: any[] = [];

  public loading: boolean;

  constructor(private pokemonService: PokemonService) {

    this.machineMove = [];
    this.levelUpMove = [];
    this.tutorMove = [];
    this.eggMove = [];


    this.pokemonService.dataPokemonMovesDetails.subscribe((result: any) => {
      this.moves = result;
      this.setMoves();
      this.loading = false;

    })
  }

  ngOnInit() {
    this.pokemonService.getGenerations().subscribe(result => {
      this.generationList = result;
    });
  }

  public getMovesByGeneration(value: any) {
    this.loading = false;
    this.generationSelected = value.name;
    this.setMoves();
  }


  public setMoves() {
    this.machineMove = [];
    this.levelUpMove = [];
    this.tutorMove = [];
    this.eggMove = [];

    for (const move of this.moves) {

      for (const moveVersion of move.version_group_details) {

        if (this.getGeneration(moveVersion.version_group.name)) {

          switch (moveVersion.move_learn_method.name) {
            case 'machine':
              this.setMoveInListMoves(this.machineMove, move)
              break;
            case 'egg':
              this.setMoveInListMoves(this.eggMove, move)
              break;
            case 'level-up':
              this.setMoveInListMoves(this.levelUpMove, move)
              break;
            case 'tutor':
              this.setMoveInListMoves(this.tutorMove, move)
              break;

          }
        }
      }
    }
    this.loading = true;
  }




  public getGeneration(namesGeneration: string) {
    switch (this.generationSelected) {
      case 'vii':
        return this.isGenerationVII(namesGeneration);
      case 'vi':
        return this.isGenerationVI(namesGeneration);
      case 'v':
        return this.isGenerationV(namesGeneration);
      case 'iv':
        return this.isGenerationIV(namesGeneration);
      case 'iii':
        return this.isGenerationIII(namesGeneration);
      case 'ii':
        return this.isGenerationII(namesGeneration);
      case 'i':
        return this.isGenerationI(namesGeneration);
      default:
        return false;
    }
  }



  public isGenerationVII(namesGeneration: string) {
    if (namesGeneration === 'ultra-sun-ultra-moon'
      || namesGeneration === 'sun-moon') {
      return true;
    }
    return false;
  }

  public isGenerationVI(namesGeneration: string) {
    if (namesGeneration === 'x-y'
      || namesGeneration === 'omega-ruby-alpha-sapphire') {
      return true;
    }
    return false;
  }

  public isGenerationV(namesGeneration: string) {
    if (namesGeneration === 'black-white'
      || namesGeneration === 'black-2-white-2') {
      return true;
    }
    return false;
  }


  public isGenerationIV(namesGeneration: string) {
    if (namesGeneration === 'diamond-pearl'
      || namesGeneration === 'platinum' || namesGeneration === 'heartgold-soulsilver') {
      return true;
    }
    return false;
  }

  public isGenerationIII(namesGeneration: string) {
    if (namesGeneration === 'ruby-sapphire'
      || namesGeneration === 'emerald') {
      return true;
    }
    return false;
  }

  public isGenerationII(namesGeneration: string) {
    if (namesGeneration === 'gold-silver'
      || namesGeneration === 'crystal') {
      return true;
    }
    return false;
  }

  public isGenerationI(namesGeneration: string) {
    if (namesGeneration === 'red-blue'
      || namesGeneration === 'yellow') {
      return true;
    }
    return false;
  }


  public setMoveInListMoves(list: any[], item: any) {
    if (!this.containsMoveInList(list, item)) {
      list.push(item);
    }
  }

  public containsMoveInList(movesList: any[], move: any) {
    for (const moveInList of movesList) {
      if (moveInList.name === move.move.name) {
        return true;
      }
    }
    return false;
  }

}
