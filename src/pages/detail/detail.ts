import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';

import { File } from "@ionic-native/File";
import { Http } from "@angular/http";
import "rxjs";

import { AutoPlayPage } from '../autoplay/autoplay';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  word: any;
  pronunciation: string;

  search: string;
  regexp: any;

  constructor(
    public navCtrl: NavController,
    public file: File,
    public http: Http,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.regexp = new RegExp(`.*`, 'i');

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
    this.regexp = new RegExp(`(.*)${this.search}(.*)`, 'i');
  }

  autoplay() {
    this.navCtrl.push(AutoPlayPage, {
      title: this.word['title'] + "　(" + this.pronunciation + ")",
      words: this.word[this.pronunciation]
    });
  }

  addWord() {
    this.alertCtrl.create({
      title: '增加單字',
      inputs: [
        {
          name: 'cn',
          placeholder: '輸入中文'
        },
        {
          name: 'jp',
          placeholder: '輸入日文',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: data => {
            if (data.cn == "" || data.jp == "") {
              this.alertCtrl.create({
                title: '提示',
                message: "請確定所有欄位都有輸入",
                buttons: ['OK!']
              }).present();
              return false;
            }

            this.file.readAsText(this.file.dataDirectory + '/words/', this.word.title + '.json').then(res => {
              let word = JSON.parse(res);
              word[this.pronunciation].push({
                cn: data.cn, jp: data.jp
              });
              this.file.writeExistingFile(this.file.dataDirectory + '/words/', this.word.title + '.json', JSON.stringify(word)).then(res => {
                this.word[this.pronunciation].push({
                  cn: data.cn, jp: data.jp
                });
                this.alertCtrl.create({
                  title: '提示',
                  message: '新增成功',
                  buttons: ['OK!']
                }).present();
              }, err => {
                this.alertCtrl.create({
                  title: '提示',
                  message: '新增失敗',
                  buttons: ['OK!']
                }).present();
              });
            }, err => {
              alert('讀取檔案失敗');
            });



          }
        }
      ]
    }).present();
  }

  longPress(index) {
    if (this.word[this.pronunciation][index].sound !== undefined) {
      this.alertCtrl.create({
        title: '提示',
        message: '無法變更內建單字',
        buttons: ['OK!']
      }).present();
      return;
    }

    this.alertCtrl.create({
      title: '操作',
      buttons: [
        {
          text: '變更',
          handler: _ => {
            this.alertCtrl.create({
              title: '選取操作',
              buttons: [
                {
                  text: '刪除',
                  handler: _ => {
                    this.alertCtrl.create({
                      title: '提示',
                      message: '確定要刪除嗎? 刪除後無法復原',
                      buttons: [
                        {
                          text: '確認',
                          handler: _ => {
                            this.file.readAsText(this.file.dataDirectory + '/words/', this.word.title + '.json').then(res => {
                              let word = JSON.parse(res);

                              word[this.pronunciation].splice(index, 1);

                              this.file.writeExistingFile(this.file.dataDirectory + '/words/', this.word.title + '.json', JSON.stringify(word)).then(res => {
                                this.word[this.pronunciation].splice(index, 1);
                                this.alertCtrl.create({
                                  title: '提示',
                                  message: '刪除成功',
                                  buttons: ['OK!']
                                }).present();
                              }, err => {
                                this.alertCtrl.create({
                                  title: '提示',
                                  message: '刪除失敗',
                                  buttons: ['OK!']
                                }).present();
                              });
                            }, err => {
                              alert('讀取檔案失敗');
                            });
                          }
                        }, {
                          text: 'Cancel',
                          role: 'cancel',
                        }
                      ]
                    }).present();
                  }
                },
                {
                  text: '修改',
                  handler: _ => {
                    this.alertCtrl.create({
                      title: '修改',
                      inputs: [
                        {
                          name: 'cn',
                          value: this.word[this.pronunciation][index].cn,
                          placeholder: '輸入中文'
                        },
                        {
                          name: 'jp',
                          value: this.word[this.pronunciation][index].jp,
                          placeholder: '輸入日文',
                        }
                      ],
                      buttons: [
                        {
                          text: '確認修改',
                          handler: data => {
                            if (data.cn == "" || data.jp == "") {
                              this.alertCtrl.create({
                                title: '提示',
                                message: "請確定所有欄位都有輸入",
                                buttons: ['OK!']
                              }).present();
                              return false;
                            }

                            this.file.readAsText(this.file.dataDirectory + '/words/', this.word.title + '.json').then(res => {
                              let word = JSON.parse(res);
                              word[this.pronunciation][index].cn = data.cn;
                              word[this.pronunciation][index].jp = data.jp;

                              this.file.writeExistingFile(this.file.dataDirectory + '/words/', this.word.title + '.json', JSON.stringify(word)).then(res => {
                                this.word[this.pronunciation][index].cn = data.cn;
                                this.word[this.pronunciation][index].jp = data.jp;
                                this.alertCtrl.create({
                                  title: '提示',
                                  message: '修改成功',
                                  buttons: ['OK!']
                                }).present();
                              }, err => {
                                this.alertCtrl.create({
                                  title: '提示',
                                  message: '修改失敗',
                                  buttons: ['OK!']
                                }).present();
                              });
                            }, err => {
                              alert('讀取檔案失敗');
                            });
                          }
                        }, {
                          text: 'Cancel',
                          role: 'cancel',
                        }
                      ]
                    }).present();
                  }
                }
              ]
            }).present();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    }).present();

  }

}
