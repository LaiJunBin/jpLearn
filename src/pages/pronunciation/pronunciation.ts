import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { File } from "@ionic-native/File";
import { Http } from "@angular/http";
import "rxjs";

@Component({
  selector: 'page-pronunciation',
  templateUrl: 'pronunciation.html'
})
export class PronunciationPage {

  word: string
  pronunciations: any = {};
  pronunciationKeys: any;

  constructor(
    public navCtrl: NavController,
    public file: File,
    public http: Http,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.word = navParams.get('title');
    this.pronunciationKeys = Object.keys(navParams.data).filter(key => ['title', 'remark'].indexOf(key) === -1);
    this.pronunciationKeys.forEach(key => {
      this.pronunciations[key] = navParams.get(key);
    });
  }

  nextPage(pronunciationKey) {
    let pronunciation = this.pronunciations[pronunciationKey];
    console.log(pronunciation);
  }

}
