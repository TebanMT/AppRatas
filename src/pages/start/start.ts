import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ConductaNrPage } from '../conducta-nr/conducta-nr';
import { ConductaRPage } from '../conducta-r/conducta-r';

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  data=this.navParams.get("data");
  cant=this.navParams.get("cant"); 
  typeBehavior=this.navParams.get("typeBehavior"); 
  sex=this.navParams.get("sex"); 
  finishFor=this.navParams.get("finishFor"); 
  typeEvent=this.navParams.get("typeEvent"); 
  minutes=this.navParams.get("minutes"); 
  cantEvent=this.navParams.get("cantEvent");
  sesionData = [];
  auxiliar = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    if (this.finishFor=='time') {
      this.auxiliar.push({minutes:this.minutes});
    }else{
      this.auxiliar.push({typeEvent:this.typeEvent, cantEvent: this.cantEvent});
    }
  }

  ionViewDidLoad() {
    for (let i = 0; i < parseInt(this.cant); i++) {
      this.sesionData.push({sex: this.sex, typeBehavior: this.typeBehavior, etiqueta: this.data[i].etiqueta, tratamiento: this.data[i].tratamiento, finishFor: this.finishFor, finishData:this.auxiliar,disable:false, disableE:true, disableS:false, buttonClicked: false});
      
    }

    let alert = this.alertCtrl.create({
      title: 'ATENCION!!',
      subTitle: 'Esta a punto de iniciar la observacion, se recomienda rotar el dispositivo de manera HORIZONTAL',
      buttons: ['OK']
    });
    alert.present();
  
  }

  nextPage(){
    try {
      if (this.sesionData[0].typeBehavior == 'cr') {
        this.navCtrl.setRoot(ConductaRPage,{"sesionData":this.sesionData});
      }else{
        this.navCtrl.setRoot(ConductaNrPage,{"sesionData":this.sesionData});
      }
      
    } catch (error) {
      let alert = this.alertCtrl.create({
        title: 'Error Inesperado: '+error,
        subTitle: 'Porfavor regrese a la pagina anterior para solucionar el problema',
        buttons: ['OK']
      });
      alert.present();
      
    }
  }

}
