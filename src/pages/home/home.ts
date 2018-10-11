import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TypeOfBehaviorPage } from '../type-of-behavior/type-of-behavior'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  nextPage(kindSex){
    this.navCtrl.push(TypeOfBehaviorPage,{"sex":kindSex});
    
    
  }

}
