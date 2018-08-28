import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { File } from "@ionic-native/File";
import { Http } from "@angular/http";
import "rxjs";

@Component({
  selector: 'page-autoplay',
  templateUrl: 'autoplay.html'
})
export class AutoPlayPage {

  title: string;
  words: any;
  pronunciation: string;

  constructor(
    public navCtrl: NavController,
    public file: File,
    public http: Http,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {

    console.log(navParams);

    this.title = navParams.get('title');
    this.words = navParams.get('words');
  }

}
