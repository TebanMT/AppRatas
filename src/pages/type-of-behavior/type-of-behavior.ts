import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the TypeOfBehaviorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-type-of-behavior',
  templateUrl: 'type-of-behavior.html',
  
})
export class TypeOfBehaviorPage {
  public kindSex=this.navParams.get("sex");

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  backPage() {
    this.navCtrl.push(HomePage);
  }

}
