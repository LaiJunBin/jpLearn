import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WordPage } from "../pages/word/word";
import { DetailPage } from "../pages/detail/detail";
import { AutoPlayPage } from "../pages/autoplay/autoplay";

import { File } from "@ionic-native/File";
import { HttpModule } from '@angular/http';

import { LongPressModule } from 'ionic-long-press';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WordPage,
    DetailPage,
    AutoPlayPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    LongPressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WordPage,
    DetailPage,
    AutoPlayPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
