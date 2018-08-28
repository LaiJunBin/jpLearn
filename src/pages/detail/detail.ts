import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { File } from "@ionic-native/File";
import { Http } from "@angular/http";
import "rxjs";

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  word: string;
  pronunciation: string;

  search: string;
  regexp: any;

  constructor(
    public navCtrl: NavController,
    public file: File,
    public http: Http,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.regexp = new RegExp(`.*`);

    this.word = navParams.get('word');
    this.pronunciation = navParams.get('pronunciation');
    this.word[this.pronunciation] = this.word[this.pronunciation].map(p => {
      p.status = false;
      return p;
    })
  }

  switchStatus(w) {
    w.status = !w.status;
  }


  onInput(evt) {
    this.regexp = new RegExp(`(.*)${this.search}(.*)`);
  }

}
