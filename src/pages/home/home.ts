import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { File } from "@ionic-native/File";
import { Http } from "@angular/http";
import "rxjs";

import { WordPage } from "../word/word";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  words: any[] = [];

  constructor(
    public navCtrl: NavController,
    public file: File,
    public http: Http,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.http.get(`assets/data/word.json`).map(res => res.json()).subscribe(data => {


      let keys = Object.keys(data);
      this.words = keys.map(function (key) {
        let obj = data[key];
        obj.title = key;
        obj.remark = obj.remark || false;
        return obj;
      });


      // this.file.checkDir(this.file.dataDirectory, 'words').then(res => {
      //   this.readWords();
      // }, err => {
      //   this.file.createDir(this.file.dataDirectory, 'words', false).then(res => {
      //     let count = 0;
      //     Object.keys(data).forEach((key, i) => {
      //       this.file.writeFile(this.file.dataDirectory + '/words/', key + '.json', JSON.stringify(data[key])).then(res => {
      //         count++;
      //         if (count == Object.keys(data).length - 1) {
      //           this.readWords();
      //         }
      //       }, err => {
      //         alert('檔案寫入失敗!');
      //       })
      //     });
      //   }, err => {
      //     alert('目錄建立失敗');
      //   });
      // });

    }, err => {
      alert(err);
    });

  }

  nextPage(word) {
    this.navCtrl.push(WordPage, word);
  }

  iconClick(word) {
    let alert = this.alertCtrl.create({
      title: word.title,
      message: word.remark,
      buttons: ['OK']
    });
    alert.present();
  }

  readWords() {
    this.file.listDir(this.file.dataDirectory, 'words').then(files => {
      files.map(file => {
        return file.name;
      }).sort(function compare(n1, n2) {
        return n1.localeCompare(n2, "zh-Hant");
      }).forEach(file => {
        this.file.readAsText(this.file.dataDirectory + '/words/', file).then(res => {
          let obj = JSON.parse(res);
          obj.title = file.replace('.json', '');
          obj.remark = obj.remark || false;
          this.words.push(obj);
        }, err => {
          alert('單字讀取失敗!');
        });
      });


    }, err => {
      alert("目錄讀取失敗");
    })

  }

}
