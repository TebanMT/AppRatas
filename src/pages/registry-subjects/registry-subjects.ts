import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TypeOfBehaviorPage } from '../type-of-behavior/type-of-behavior';
import { AlertController } from 'ionic-angular';
import { FinishForPage } from '../finish-for/finish-for'

/**
 * Generated class for the RegistrySubjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registry-subjects',
  templateUrl: 'registry-subjects.html'
})
export class RegistrySubjectsPage {
  public sex=this.navParams.get("sex");
  public cant=this.navParams.get("cant");
  public typeBehavior = this.navParams.get("typeBehavior");
  public data = this.navParams.get("data");; 

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    if (this.data.length == 0) {
      for (let i = 0; i < parseInt(this.cant); i++) {
        this.data.push({etiqueta:"",tratamiento:""});
        
      }
    }  
  }

  nextPage2(data){
    const cant = data.length;
    if (data[0].etiqueta == "") {
      let alert = this.alertCtrl.create({
        title: 'Datos Incorrectos',
        subTitle: 'Por favor ingrese todos los datos solicitados',
        buttons: ['OK']
      });
      alert.present();
    }else{
      this.navCtrl.push(FinishForPage,{"date":data,"cant":cant,"typeBehavior": this. typeBehavior,"sex":this.sex}); 
    } 
  }
  backPage(){
    this.navCtrl.push(TypeOfBehaviorPage,{"cant":this.cant,"typeBehavior": this. typeBehavior,"sex":this.sex});
  }

}
