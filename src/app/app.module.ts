import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OneRatPage } from '../pages/one-rat/one-rat';
import { TwoRatPage } from '../pages/two-rat/two-rat';
import { ThreeRatPage } from '../pages/three-rat/three-rat';
import { FourtRatPage } from '../pages/fourt-rat/fourt-rat';
import { TypeOfBehaviorPage } from '../pages/type-of-behavior/type-of-behavior';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OneRatPage,
    TwoRatPage,
    ThreeRatPage,
    FourtRatPage,
    TypeOfBehaviorPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OneRatPage,
    TwoRatPage,
    ThreeRatPage,
    FourtRatPage,
    TypeOfBehaviorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
