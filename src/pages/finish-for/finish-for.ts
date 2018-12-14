import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StartPage } from '../start/start';
import { RegistrySubjectsPage } from '../registry-subjects/registry-subjects'

/**
 * Generated class for the FinishForPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finish-for',
  templateUrl: 'finish-for.html',
})
export class FinishForPage {
  public sex=this.navParams.get("sex");
  public cant=this.navParams.get("cant");
  public typeBehavior = this.navParams.get("typeBehavior");
  public data = this.navParams.get("date"); 

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
  }

  errorAlert(text){
    let alert = this.alertCtrl.create({
      title: 'Datos Incorrectos',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
  nextPage2(finishFor, typeEvent, minutes, cantEvent){
    if (finishFor == null ) {
      this.errorAlert('Por favor ingrese como desea terminar la sesión');
    }else{
      if(finishFor == 'event' && typeEvent == null){ this.errorAlert('Por favor ingrese el tipo de evento');}
      else{
        if(finishFor == 'event' && (typeEvent == 'eyaculaciones' || typeEvent == 'montas') && (cantEvent == null || cantEvent <=0) ){
          this.errorAlert('Por favor ingrese el numero de envetos con los que desea terminar la sesión')
        }
        else{
          if(finishFor == 'time' && minutes == null){this.errorAlert('Por favor ingrese el tiempo de la sesión')}
          else{
            this.navCtrl.push(StartPage,{"data":this.data,"cant":this.cant,"typeBehavior": this. typeBehavior,"sex":this.sex, finishFor: finishFor, typeEvent: typeEvent, minutes: minutes, cantEvent: cantEvent});
          }
        }
      }
    } 
    
    
  }

  backPage(){
    this.navCtrl.push(RegistrySubjectsPage,{"data":this.data,"cant":this.cant,"typeBehavior": this. typeBehavior,"sex":this.sex});
  }

}
