import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { File } from "@ionic-native/File";
import { Http } from "@angular/http";
import "rxjs";

import { WordPage } from "../word/word";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categories: any

  constructor(
    public navCtrl: NavController,
    public file: File,
    public http: Http,
  ) {
    this.http.get('assets/data/category.json').map(res => res.json()).subscribe(data => {
      this.categories = data;
    },
      err => {
        alert(err);
      });
  }

  nextPage(category) {
    this.navCtrl.push(WordPage, category);
  }

}
