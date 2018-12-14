import { Injectable } from '@angular/core';

/*
  Generated class for the BehaviorParametersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BehaviorParametersProvider {
  public dataRata = [];
  public dataParamenters = [];

  constructor() {}

  setData(data){
    this.dataRata=data;
    this.setDataParameters();
  }

  setDataParameters(){
    for (let i = 0; i < this.dataRata.length; i++) {
      this.dataParamenters.push({rat: this.dataRata[i].rat, mountFrequency: 0, mountLatency: 0, 
        intromissionFrequency:0, intromissionLatency: 0,ejaculatoryFrequency:0, ejaculatoryLatency: 0, postEjaculatoryInterval:0,
        intromissionRatio: 0, interIntromissionInterval: 0, copulatoryRate: 0, lordosisRatio:0,
        averageIntensityLordosis:0,frequencyOutputsMount:0, frequencyOutputsIntromission:0, frequencyOutputsEjaculation:0,
        frequencyInputsMount:0, frequencyInputsIntromission:0, frequencyInputsEjaculation:0,
        timeInput:0, timeOutput:0}); 
    }
  }

  getDataParameters(){
    console.log(this.dataParamenters);
    return this.dataParamenters;
    
  }

  convertTimeToSeconds(time){
    const timeSplit = time.split(":",3);
    var segundo = (parseInt(timeSplit[2]));
    var minuto = (parseInt(timeSplit[1]) * 60);
    var hora = (parseInt(timeSplit[0]) * 3600);
    return (segundo+minuto+hora);

  }

  mountFrequency(){
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j]=='m') {
          this.dataParamenters[i].mountFrequency += 1;
        }
      }
    }
  }

  ejaculatoryFrequency(){
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j]=='e') {
          this.dataParamenters[i].ejaculatoryFrequency += 1;
        }
      }
    }
  }

  mountLatency(){
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j]=='m') {
          this.dataParamenters[i].mountLatency = this.convertTimeToSeconds(this.dataRata[i].time[j]);
          break;
        }
      }
    }
  }

  intromissionFrequency(){
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j]=='i') {
          this.dataParamenters[i].intromissionFrequency += 1;
        }
      }
    }
  }

  intromissionLatency(){
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j]=='i') {
          this.dataParamenters[i].intromissionLatency = this.convertTimeToSeconds(this.dataRata[i].time[j]);
          break;
        }
      }
    }
  }

  ejaculatoryLatency(){
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j]=='i') {
          for (let k = j; k < this.dataRata[i].events.length; k++) {
            if (this.dataRata[i].events[k]=='e') {
              this.dataParamenters[i].ejaculatoryLatency = this.sumPostEjaculatoryInterval(this.dataRata[i].time[j],this.dataRata[i].time[k]);
              break;
            }
          }
          break;}
      }
    }
  }

  postEjaculatoryInterval(){
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j]=='e') {
          for (let k = j; k < this.dataRata[i].events.length; k++) {
            if (this.dataRata[i].events[k]=='i') {
              this.dataParamenters[i].postEjaculatoryInterval = this.sumPostEjaculatoryInterval(this.dataRata[i].time[j],this.dataRata[i].time[k]);
              break;
            }
          }
          break;}
      }
    }
  }

  sumPostEjaculatoryInterval(timeFirst, timeSecond){
    const first = this.convertTimeToSeconds(timeFirst);
    const last = this.convertTimeToSeconds(timeSecond);
    return last-first; 
  }

  intromissionRatio(){
    for (let i = 0; i < this.dataRata.length; i++) {
      const ratio = (this.dataParamenters[i].intromissionFrequency / this.dataParamenters[i].mountFrequency) + this.dataParamenters[i].intromissionFrequency;
      this.dataParamenters[i].intromissionRatio = ratio;
    }
  }

  interIntromissionInterval(){
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j]=='i') {
          for (let k = j; k < this.dataRata[i].events.length; k++) {
            if (this.dataRata[i].events[k]=='e') {
              let aux = (this.sumPostEjaculatoryInterval(this.dataRata[i].time[j],this.dataRata[i].time[k]) / this.dataParamenters[i].intromissionFrequency);
              this.dataParamenters[i].interIntromissionInterval = aux;
              break;
            }
          }
          break;}
      }
    }
  }

  copulatoryRate(){
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j]=='m') {
          for (let k = j; k < this.dataRata[i].events.length; k++) {
            if (this.dataRata[i].events[k]=='e') {
              let firstMountToEjaculation = this.sumPostEjaculatoryInterval(this.dataRata[i].time[j],this.dataRata[i].time[k]);
              let sum = this.dataParamenters[i].mountFrequency + this.dataParamenters[i].intromissionFrequency;
              let copulatoryRate = sum / firstMountToEjaculation;
              this.dataParamenters[i].copulatoryRate = copulatoryRate;
              break;
            }
          }
          break;}
      }
    }
  }

  lordosisRatio(){
    var eventsTotal = 0;
    var num_lordosis = 0;
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].lordosis.length; j++) {
        if (this.dataRata[i].lordosis[j] != 0) {
          num_lordosis += 1;
        } 
      }
      this.dataParamenters[i].lordosisRatio = num_lordosis;
    }

    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j] != 'en' || this.dataRata[i].events[j] != 's') {
          eventsTotal += 1; 
        }
      }
      this.dataParamenters[i].lordosisRatio = (this.dataParamenters[i].lordosisRatio/eventsTotal)*100 ;
    }
  }

  averageIntensityLordosis(){
    var sum_lordosis = 0;
    var eventsTotal = 0;
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].lordosis.length; j++) {
        sum_lordosis +=  this.dataRata[i].lordosis[j];
      }
      this.dataParamenters[i].averageIntensityLordosis = sum_lordosis;
    }

    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j] != 'en' || this.dataRata[i].events[j] != 's') {
          eventsTotal += 1; 
        }
      }
      this.dataParamenters[i].averageIntensityLordosis = (this.dataParamenters[i].averageIntensityLordosis/eventsTotal);
    }
  }

  frequencyOutputsMount(){
    var num_salidas= new Array(this.dataRata.length).fill(0); // array montas por rata
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j] == 's') {
          num_salidas[i] += 1; 
        }
      }
      this.dataParamenters[i].frequencyOutputsMount = (num_salidas[i]/this.dataParamenters[i].mountFrequency)*100;
    }
  }

  frequencyOutputsIntromission(){
    var num_salidas= new Array(this.dataRata.length).fill(0); // array montas por rata
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j] == 'i') {
          num_salidas[i] += 1; 
        }
      }
      this.dataParamenters[i].frequencyOutputsIntromission = (num_salidas[i]/this.dataParamenters[i].intromissionFrequency)*100;
    }
  }

  frequencyOutputsEjaculation(){
    var num_salidas= new Array(this.dataRata.length).fill(0); // array montas por rata
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j] == 'e') {
          num_salidas[i] += 1; 
        }
      }
      this.dataParamenters[i].frequencyOutputsEjaculation = (num_salidas[i]/this.dataParamenters[i].ejaculatoryFrequency)*100;
    }
  }

  frequencyInputsMount(){
    var num_entradas= new Array(this.dataRata.length).fill(0); // array montas por rata
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j] == 'en') {
          num_entradas[i] += 1; 
        }
      }
      this.dataParamenters[i].frequencyInputsMount = (num_entradas[i]/this.dataParamenters[i].mountFrequency)*100;
    }
  }

  frequencyInputsIntromission(){
    var num_entradas= new Array(this.dataRata.length).fill(0); // array montas por rata
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j] == 'en') {
          num_entradas[i] += 1; 
        }
      }
      this.dataParamenters[i].frequencyInputsIntromission = (num_entradas[i]/this.dataParamenters[i].intromissionFrequency)*100;
    }
  }

  frequencyInputsEjaculation(){
    var num_entradas= new Array(this.dataRata.length).fill(0); // array montas por rata
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j] == 'en') {
          num_entradas[i] += 1; 
        }
      }
      this.dataParamenters[i].frequencyInputsEjaculation = (num_entradas[i]/this.dataParamenters[i].ejaculatoryFrequency)*100;
    }
  }

  timeInput(){
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j] != 's') {
          for (let k = j; k < this.dataRata[i].events.length; k++) {
            if (this.dataRata[i].events[k]=='e') {
              
            }
          }
         // this.dataParamenters[i].timeInput += this.convertTimeToSeconds(this.dataRata[i].time[j]);
        }
      }
    }
  }

  timeOutput(){
    for (let i = 0; i < this.dataRata.length; i++) {
      for (let j = 0; j < this.dataRata[i].events.length; j++) {
        if (this.dataRata[i].events[j] != 'en' && this.dataRata[i].events[j] != 's') {
          this.dataParamenters[i].timeOutput += this.convertTimeToSeconds(this.dataRata[i].time[j]);
        }
      }
    }
  }

}
