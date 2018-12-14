import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { BehaviorParametersProvider } from '../../providers/behavior-parameters/behavior-parameters'
import { HomePage } from "../home/home";
import * as papa from 'papaparse';
import { SocialSharing } from '@ionic-native/social-sharing';
import { File } from '@ionic-native/file';


/**
 * Generated class for the ShowDataNrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-data-nr',
  templateUrl: 'show-data-nr.html',
})
export class ShowDataNrPage {
  dataRat = this.navParams.get("data"); //array de los datos de configuracion para la sesion;
  dataSession = this.navParams.get("dataSesion");
  dataParameters: any[]= [];
  csvData: any[] = [];
  headerRow: any[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public behaviorParameters: BehaviorParametersProvider,
    public actionSheetCtrl: ActionSheetController,
    public socialShering: SocialSharing,
    public alertCtrl: AlertController,
    private file: File) { 
  }

  ionViewDidLoad() {
    this.behaviorParameters.setData(this.dataRat);    
    this.behaviorParameters.mountFrequency();
    this.behaviorParameters.mountLatency();
    this.behaviorParameters.intromissionFrequency();
    this.behaviorParameters.intromissionLatency();
    this.behaviorParameters.ejaculatoryFrequency();
    this.behaviorParameters.ejaculatoryLatency();
    this.behaviorParameters.postEjaculatoryInterval();
    this.behaviorParameters.intromissionRatio();
    this.behaviorParameters.interIntromissionInterval();
    this.behaviorParameters.copulatoryRate();
    this.behaviorParameters.lordosisRatio();
    this.behaviorParameters.averageIntensityLordosis();
    this.behaviorParameters.frequencyOutputsMount();
    this.behaviorParameters.frequencyOutputsIntromission();
    this.behaviorParameters.frequencyOutputsEjaculation();
    this.behaviorParameters.frequencyInputsMount();
    this.behaviorParameters.frequencyInputsIntromission();
    this.behaviorParameters.frequencyInputsEjaculation();
    this.behaviorParameters.timeInput();
    this.behaviorParameters.timeOutput();
    this.dataParameters = this.behaviorParameters.getDataParameters();
    console.log(this.dataRat);
    

    let alert = this.alertCtrl.create({
      title: 'SESION FINALIZADA',
      subTitle: 'Por favor comparta los resultados. Los resultados se guardar dentro del dispositivo',
      buttons: ['OK']
    });
    alert.present();
  }

  
  hoyFecha(){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1;
    var yyyy = hoy.getFullYear();  
    dd = this.addZero(dd);
    mm = this.addZero(mm);
    return dd+'/'+mm+'/'+yyyy;
  }

  
 addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }

  downloadCSV() {
    var csv;
    var name;
    if (this.dataSession[0].typeBehavior == 'cr') {
      name="Conducta Regulada ";
      csv = papa.unparse({
        fields: ["rat","mountFrequency", "mountLatency","intromissionFrequency","intromissionLatency",
        "ejaculatoryLatency","postEjaculatoryInterval","intromissionRatio","interIntromissionInterval",
        "copulatoryRate","lordosisRatio","averageIntensityLordosis","frequencyOutputsMount","frequencyOutputsIntromission",
        "frequencyOutputsEjaculation","frequencyInputsMount","frequencyInputsIntromission",
        "frequencyInputsEjaculation"],
        data: this.dataParameters
      });
    }else{
      name="Conducta No Regulada ";
      csv = papa.unparse({
        fields: ["rat","mountFrequency", "mountLatency","intromissionFrequency","intromissionLatency",
        "ejaculatoryLatency","postEjaculatoryInterval","intromissionRatio","interIntromissionInterval",
        "copulatoryRate","lordosisRatio","averageIntensityLordosis"],
        data: this.dataParameters
      });
    }
    
    var blob = new Blob([csv]);
    
    
   /* this.file.checkDir(this.file.dataDirectory, name)
    .then(_ => 
      this.file.writeFile(this.file.dataDirectory+"/"+name,this.dataSession[0].sex+"("+this.dataRat.length+")"+this.hoyFecha()+".csv",blob,{replace:false})
      .then(_ => this.showAlert("Archivo Guardado","El archivo se guardo en la ruta: "+this.file.dataDirectory+"/"+name))
      .catch(_ => this.showAlert("Error","Error al crear el archivo en el almacenamiento local: "+this.file.dataDirectory) ))
    .catch(err => this.file.createDir(this.file.dataDirectory,name,true)
      .then(data => this.file.writeFile(data.toURL(),this.dataSession[0].sex+"("+this.dataRat.length+")"+this.hoyFecha()+".csv",blob,{replace:false})
        .then(_ => this.showAlert("Archivo Guardado","El archivo se guardo en la ruta: "+data.toURL()) )
        .catch(_ => this.showAlert("Error", "Error al crear el archivo en el almacenamiento local 2: "+data.toURL()) ) )
      .catch(_ => this.showAlert("Error","Error al crear el directorio:" +name) ));*/

    this.file.checkDir(this.file.dataDirectory, name)
    .then(_ => this.showAlert("Correcto", "Directorio Ya existe"))
    .catch(_ => this.file.createDir(this.file.dataDirectory,name,true)
      .then(_ => this.showAlert("Correcto","Directorio creado correctamente "+this.file.dataDirectory))
      .catch(_ => this.showAlert("Error","Directorio no se creo "+ this.file.dataDirectory)) )
    
    /*Dummy implementation for Desktop download purpose
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = name+""+this.dataSession[0].sex+"("+this.dataRat.length+")"+this.hoyFecha()+".csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);*/
  }


  share() {
    var csv = papa.unparse({
      fields: ["rat","mountFrequency", "mountLatency","intromissionFrequency","intromissionLatency","ejaculatoryLatency","postEjaculatoryInterval","intromissionRatio","interIntromissionInterval","copulatoryRate"],
      data: this.dataParameters
    });
    this.socialShering.shareViaEmail("Prueba","Esteban",["Mendiola_esteban@outlook.com"],[],[],csv)
      .then(()=>{
        console.log("success");
        
      }).catch(()=>{
        console.log("error");
        
      });
  }

  newSesion(){
     window.location.reload();
    this.navCtrl.setRoot(HomePage);
  }

  showAlert(title,sub){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: sub,
      buttons: ['OK']
    });
    alert.present();
  }

}
