import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-type-relations-detail',
  templateUrl: './type-relations-detail.component.html',
  styleUrls: ['./type-relations-detail.component.css']
})
export class TypeRelationsDetailComponent implements OnInit, OnChanges {


  @Input() pokemonTypes: any[];

  private typesDetails: any[];

  private doubleDamageFrom: any[]; // Una lista de tipos que son muy efectivos contra este tipo.
  private halfDamageFrom: any[]; // Una lista de tipos que no son muy efectivos contra este tipo.
  private noDamageFrom: any[]; // Una lista de los tipos que no tienen ningún efecto sobre este tipo.
  private doubleDamageTo: any[]; // Una lista de tipos de este tipo tiene un gran efecto en contra.
  private halfDamageTo: any[]; // Una lista de tipos de este tipo no tiene mucho efecto en contra.
  private noDamageTo: any[]; // Una lista de tipos de este tipo no tiene ningún efecto.



  public loading: boolean;

  constructor(private pokemonService: PokemonService) {
    this.loading = false;
    this.typesDetails = [];
    this.doubleDamageFrom = [];
    this.doubleDamageTo = [];
    this.halfDamageFrom = [];
    this.halfDamageTo = [];
    this.noDamageFrom = [];
    this.noDamageTo = [];
   }

  ngOnChanges() {
    // Limpiar Listas de relaciones de tipo
    this.doubleDamageFrom = [];
    this.doubleDamageTo = [];
    this.halfDamageFrom = [];
    this.halfDamageTo = [];
    this.noDamageFrom = [];
    this.noDamageTo = [];

    this.loading = false;
    this.pokemonService.getDetailsType(this.pokemonTypes).subscribe((result: any) => {
      this.typesDetails = result;
      this.getTypeRelations();
    });

    
  }

  ngOnInit() {
    
  }


  public getTypeRelations() {
    for (const typeDetails of this.typesDetails) {
      const damageRelations = typeDetails.damage_relations;
      this.setTypeInListRelations(damageRelations.no_damage_to, this.noDamageTo);
      this.setTypeInListRelations(damageRelations.half_damage_to, this.halfDamageTo) ;
      this.setTypeInListRelations(damageRelations.double_damage_to, this.doubleDamageTo);
      this.setTypeInListRelations(damageRelations.no_damage_from, this.noDamageFrom);
      this.setTypeInListRelations(damageRelations.half_damage_from, this.halfDamageFrom);
      this.setTypeInListRelations(damageRelations.double_damage_from, this.doubleDamageFrom);
    }
    this.loading = true;
  }

  public setTypeInListRelations(damageRelationList: any [], typeRelationsList: any []) {
    for (const type of damageRelationList) {
      if (!this.containsTypeNameInList(typeRelationsList, type)) {
        typeRelationsList.push(type);
      }
    }
  }


  public containsTypeNameInList(typeRelationsList: any, typePokemon: any){
    for (const type of typeRelationsList) {
        if (type.name === typePokemon.name) {
            return true;
        }
    }
    return false;
  }



}
