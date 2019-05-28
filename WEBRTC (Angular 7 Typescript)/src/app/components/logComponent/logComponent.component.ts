import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var Cti: any;

type loginPayload = { login: string; password: string; };

@Component({
  selector: 'logComponent',
  templateUrl: './logComponent.component.html',
  styleUrls: ['./logComponent.component.css']
})
export class LogComponent {

  constructor(private http: HttpClient, private router: Router) {
    this.http = http;
    this.Cti = Cti;
  }

  public errorMessage: string;
  public phoneNumber: string;
  public host: string;
  private password: string;
  private login: string;
  private data: any;
  private Cti: any;

  logMeIn = () => {

    const payload: loginPayload = { login: this.login, password: this.password };
    this.http.post('http://' + this.host + '/xuc/api/2.0/auth/login', payload)
      .subscribe(data => {
        this.data = data;
        var wsUrl: string = "ws://" + this.host + "/xuc/api/2.0/cti?token=" + this.data.token;
        this.Cti.WebSocket.init(wsUrl, this.login, this.phoneNumber);
        this.errorMessage = undefined;
        this.router.navigateByUrl('home');
      }, err => {
        this.errorMessage = "Login error: " + err.message;
      });
  }

}