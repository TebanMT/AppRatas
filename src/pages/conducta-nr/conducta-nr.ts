import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ShowDataNrPage } from "../show-data-nr/show-data-nr";
import { Vibration } from '@ionic-native/vibration';

/**
 * Generated class for the FourtRatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * 
 * m = monta
 * i = intromision
 * e = eyeculacion
 * 
 */

@IonicPage()
@Component({
  selector: 'page-conducta-nr',
  templateUrl: 'conducta-nr.html',
})
export class ConductaNrPage {
  
  //Decalaracion de variables para el tratamiento de datos
  sesionData=this.navParams.get("sesionData"); //array de los datos de configuracion para la sesion
  iIntromision= new Array(this.sesionData.length).fill(0); // array intromisiones por rata
  iEyeculacion= new Array(this.sesionData.length).fill(0); // array eyaculaciones por rata
  iMontas= new Array(this.sesionData.length).fill(0); // array montas por rata
  auxFinish=[]; // array auxiliar para finalizar la sesion por evento
  disableButtonS;
  horas: number; // variable hora 'incremento'
  minutos: number;// variable minutos 'incremento'
  segundos: number;// variable segundos 'incremento'
  horasDesc: number; // variable hora 'decrementos' para cuando la sesion sea por tiempo
  minutosDesc: number;// variable minutos 'decrementos' para cuando la sesion sea por tiempo
  segundosDesc: number;// variable segundos 'decrementos' para cuando la sesion sea por tiempo
  eventos = []; // array final que contiene los eventos(intomision,eyaculacion,monta,lordosis y tiempo) de cada rata

  //constructor
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private vibration: Vibration) {
    //inicializar 'cronometro' si la sesion termina por tiempo ---Desendente----
    if (this.sesionData[0].finishData[0].minutes) {
      let timePluss = ""+this.sesionData[0].finishData[0].minutes+":"+0; 
      const time = timePluss.split(":",3);
      this.horasDesc=parseInt(time[0]);
      this.segundosDesc=parseInt(time[2]);
      this.minutosDesc=parseInt(time[1]);
      setInterval(()=>this.tick(),1000); 
    }//

    //inicializacion del 'reloj' que llevara el tiempo de la sesion independientemente si termina por tiempo o evento 
    this.horas=0;
    this.segundos=0;
    this.minutos=0;
    setInterval(()=>this.tickPluss(),1000);
    //

    //inicializacion del array eventos con la cantidad de ratas de la sesion
    for (let i = 0; i < this.sesionData.length; i++) {
      this.eventos.push({rat: this.sesionData[i].etiqueta, events:[], lordosis:[], time:[]}); 
    }
    //

  }//

  //antes de que cargue la vista inicializar el array auxFinish para saber con cual evento terminara la sesion
  ionViewDidLoad() {
    if (this.sesionData[0].finishData[0].typeEvent == 'montas') {
      this.auxFinish = this.iMontas;
    }else{
      this.auxFinish = this.iEyeculacion;
    }
  }//

  //funcion monta que recibe un objeto rata 
  monta(rat){
    const index = this.sesionData.indexOf(rat); //buscar el index a la que pertenece el objeto recivido en el array sesionData
    this.iMontas[index] =  parseInt(this.iMontas[index]+1); //incremento en el array montas en el index del objeto recivido
    this.eventos[index].events.push('m');// agregar evento monta('m') al array eventos 
    this.eventos[index].time.push(this.horas+':'+this.minutos+':'+this.segundos); //agregar el tiempo en el que ocurrio el evento monta al array evento
    this.finishByEvent(); //pregunta si la sision finalizo por eventos
  }//

  intromision(rat){
    const index = this.sesionData.indexOf(rat);//buscar el index a la que pertenece el objeto recivido en el array sesionData
    this.iIntromision[index] =  parseInt(this.iIntromision[index]+1);//incremento en el array intromision en el index del objeto recivido
    this.eventos[index].events.push('i');// agregar evento intromision('i') al array eventos 
    this.eventos[index].time.push(this.horas+':'+this.minutos+':'+this.segundos);//agregar el tiempo en el que ocurrio el evento intromision al array evento
  }

  eyaculacion(rat){
    if (rat.sex == 'Hembra') {
      //bloquear botones que no sean de lordosis eyaculatorio y activa lordosis eyaculatorio
      rat.buttonClicked = true; 
      rat.disableS = true;
      rat.disableE = true;
      rat.disable = true;
      //
    }
    const index = this.sesionData.indexOf(rat);//buscar el index a la que pertenece el objeto recivido en el array sesionData
    this.eventos[index].events.push('e');// agregar eyeculacion('e') al array eventos 
    this.eventos[index].time.push(this.horas+':'+this.minutos+':'+this.segundos);//agregar el tiempo en el que ocurrio el evento eyaculacion al array evento
    
    
  }

  //agrega intensidad de lordosis a el array evento
  lordosis(rat,intensidad){
    if (intensidad == 0) {
      this.vibration.vibrate(0);
    }
    if (intensidad == 1) {
      this.vibration.vibrate(50);
    }
    if (intensidad == 2) {
      this.vibration.vibrate([50,20,50]);
    }
    const index = this.sesionData.indexOf(rat);
    this.eventos[index].lordosis.push(intensidad);
  }//

  //agrega intensidad de lordosis Eyaculatorio a el array evento
  lordosisEyaculatorio(rat,intensidad){
    //Desbloquea botones que no sean de lordosis eyaculatorio y desactiva lordosis eyaculatorio
    rat.buttonClicked = false; 
    rat.disableS = false;
    rat.disableE = true;
    rat.disable = false;
    //
    if (intensidad == 0) {
      this.vibration.vibrate(0);
    }
    if (intensidad == 1) {
      this.vibration.vibrate(50);
    }
    if (intensidad == 2) {
      this.vibration.vibrate([50,20,50]);
    }
    const index = this.sesionData.indexOf(rat);
    this.eventos[index].lordosis.push(intensidad);
    this.iEyeculacion[index] =  parseInt(this.iEyeculacion[index]+1);//incremento en el array eyaculacion en el index del objeto recivido
    this.finishByEvent(); //pregunta si la sision finalizo por eventos
  }//

  eliminar(rat){  
    const index = this.sesionData.indexOf(rat);
    if (this.eventos[index].events[this.eventos[index].events.length-1] == 'm') {
      this.iMontas[index] = this.iMontas[index]-1;
      this.eventos[index].lordosis.pop();
    }else{
      if (this.eventos[index].events[this.eventos[index].events.length-1] == 'i') {
        this.iIntromision[index] = this.iIntromision[index]-1;
        this.eventos[index].lordosis.pop();
      }else{
        if (this.eventos[index].events[this.eventos[index].events.length-1] == 'e' && this.eventos[index].events.length == this.eventos[index].lordosis.length) {
          this.iEyeculacion[index] = this.iEyeculacion[index]-1;
          this.eventos[index].lordosis.pop();
        }else{
          if (this.eventos[index].events[this.eventos[index].events.length-1] == 'e' ) {
            //Desbloquea botones que no sean de lordosis eyaculatorio y desactiva lordosis eyaculatorio
            rat.buttonClicked = false; 
            rat.disableS = false;
            rat.disableE = true;
            rat.disable = false;
            //
            
          }else{
            if (this.eventos[index].events[this.eventos[index].events.length-1] == 'en') {
              rat.disableS = true;
              rat.disableE = false;
              rat.disable = true;
            }else{
              rat.disableS = false;
              rat.disableE = true;
              rat.disable = false;
            }
          }
        }
      }
    }
    this.eventos[index].events.pop();
    this.eventos[index].time.pop();

    
  }

  //cronometro --Decendente--
  private tick(){
    if(--this.segundosDesc<0){
      this.segundosDesc=59;
      if (--this.minutosDesc<0) {
        this.minutosDesc=59;
        if (--this.horasDesc<0) {
          //this.errorAlert("Fin de la sesión");
          this.navCtrl.setRoot(ShowDataNrPage,{"data":this.eventos,"dataSesion":this.sesionData});
        }
        
      }
    }
  }//

  //reloj --Incremento--
  private tickPluss(){
    if(++this.segundos>59){
      this.segundos=0;
      if (++this.minutos>59) {
        this.minutos=0;
        this.horas++;
      }
    }
    //console.log(this.segundos);
  }//

  //Sesion finaliza por evento
  private finishByEvent(){
    const totalEvents = this.sesionData[0].finishData[0].cantEvent * this.sesionData.length;
    const sumEvents = this.sumEvents(); 
    if (totalEvents == sumEvents) {
      this.navCtrl.setRoot(ShowDataNrPage,{"data":this.eventos,"dataSesion":this.sesionData});
    }
  }//

  //suma de los eventos de finalizacion
  private sumEvents(){
    var total=0;
    this.auxFinish.forEach(element => {
      total+=element;
    });
    return total;
  }//

  //alert 
  alertFunction(text){
    let alert = this.alertCtrl.create({
      title: 'FIN DE LA SESIÓN',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }//

}
