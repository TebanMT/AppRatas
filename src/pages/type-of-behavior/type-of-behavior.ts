import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { RegistrySubjectsPage } from '../registry-subjects/registry-subjects';

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
  public typeBehavior ; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  backPage() {
    this.navCtrl.push(HomePage);
  }
  nextPage(typeBehavior,cant){
    if (typeBehavior == null || cant == null || (typeBehavior == 'cr' && cant>2) ) {
      let alert = this.alertCtrl.create({
        title: 'Datos Incorrectos',
        subTitle: 'Porfavor ingrese el tipo de comportamiento y el numero de ratas '+this.navParams.get("sex"),
        buttons: ['OK']
      });
      alert.present();
    }else{
      this.navCtrl.push(RegistrySubjectsPage,{"cant":cant,"typeBehavior": typeBehavior,"sex":this.kindSex});
      
    }

  }

}
