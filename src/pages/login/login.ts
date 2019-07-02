import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { snapshotToArray } from '../../app/app.firebase.config';

import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  ref = firebase.database().ref('usuarios/');
  users: any[];
  splash = true;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {
      this.ref.on('value', resp => {
        this.users = snapshotToArray(resp);
      });
  }
  
  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 4000);
  }

  // Attempt to login in through our User service
  doLogin() {
    let usuarioLogueado = this.users.find(elem => (elem.correo == this.account.email && elem.clave == this.account.password));

    if (usuarioLogueado !== undefined) {
      sessionStorage.setItem('usuario', JSON.stringify(usuarioLogueado));
      this.navCtrl.setRoot(MainPage);
    } else {
      this.toastCtrl.create({
        message: "Usuario o password incorrecto.",
        duration: 3000,
        position: 'top'
      }).present();
    }
  }

  cargarUsuario(usuario: string) {
    switch (usuario) {
      case "admin":
        this.account.email = "admin@gmail.com";
        this.account.password = "1111";
        break;
      case "invitado":
        this.account.email = "invitado@gmail.com";
        this.account.password = "2222";
        break;
      case "usuario":
        this.account.email = "usuario@gmail.com";
        this.account.password = "3333";
        break;
      case "anonimo":
        this.account.email = "anonimo@gmail.com";
        this.account.password = "4444";
        break;
      case "tester":
        this.account.email = "tester@gmail.com";
        this.account.password = "5555";
        break;
      default:
        this.account.email = "";
        this.account.password = "";
        break;
    }
  }
}
