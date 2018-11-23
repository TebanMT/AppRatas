import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConductaNrPage } from '../pages/conducta-nr/conducta-nr';
import { TypeOfBehaviorPage } from '../pages/type-of-behavior/type-of-behavior';
import { RegistrySubjectsPage } from '../pages/registry-subjects/registry-subjects';
import { StartPage } from "../pages/start/start";
import { FinishForPage } from '../pages/finish-for/finish-for'
import { ConductaRPage } from '../pages/conducta-r/conducta-r';
import { ShowDataNrPage } from "../pages/show-data-nr/show-data-nr";
import { BehaviorParametersProvider } from '../providers/behavior-parameters/behavior-parameters';
import { SocialSharing } from  '@ionic-native/social-sharing' ;
import { Vibration } from '@ionic-native/vibration';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConductaNrPage,
    ConductaRPage,
    TypeOfBehaviorPage,
    RegistrySubjectsPage,
    FinishForPage,
    ShowDataNrPage,
    StartPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConductaNrPage,
    ConductaRPage,
    TypeOfBehaviorPage,
    RegistrySubjectsPage,
    FinishForPage,
    ShowDataNrPage,
    StartPage
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BehaviorParametersProvider,
    SocialSharing,
    Vibration,
    File
  ]
})
export class AppModule {}
