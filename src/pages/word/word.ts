import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { File } from "@ionic-native/File";
import { Http } from "@angular/http";
import "rxjs";

import { PronunciationPage } from "../pronunciation/pronunciation";

@Component({
  selector: 'page-word',
  templateUrl: 'word.html'
})
export class WordPage {

  category: string
  words: any;

  constructor(
    public navCtrl: NavController,
    public file: File,
    public http: Http,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.category = navParams.get('title');
    let dirname = navParams.get('dirname');
    this.http.get(`assets/data/${dirname}/word.json`).map(res => res.json()).subscribe(data => {
      let keys = Object.keys(data);
      this.words = keys.map(function (key) {
        let obj = data[key];
        obj.title = key;
        obj.remark = obj.remark || false;
        return obj;
      });
    },
      err => {
        alert(err);
      });
  }

  nextPage(word) {
    this.navCtrl.push(PronunciationPage, word);
  }

  iconClick(word) {
    let alert = this.alertCtrl.create({
      title: word.title,
      message: word.remark,
      buttons: ['OK']
    });
    alert.present();
  }

}
