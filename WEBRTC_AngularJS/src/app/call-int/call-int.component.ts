import {Cti} from '../xccti/js/cti.js';
import * as $ from 'jquery';
import {} from 'angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'call-int',
  templateUrl: './call-int.component.html',
  styleUrls: ['./call-int.component.css']
})

export class callIntComponent implements OnInit {

  constructor() {/*
    Cti.setHandler(Cti.MessageType.USERCONFIGUPDATE, this._onUserConfigUpdate);
    Cti.setHandler(Cti.MessageType.AGENTLIST, this._onAgentList);
    Cti.setHandler(Cti.MessageType.AGENTSTATEEVENT, this._onAgentState);
    Cti.setHandler(Cti.MessageType.LOGGEDON, this._loggedOnHandler);
    Cti.setHandler(Cti.MessageType.SHEET, this._onSheetReceived);
    */
  }

  public world: string = 'XiVO';
  public agentStatuses: Array<string> = [];
  public agents: Array<string> = [];

  ngOnInit = () => {}
  
  _loggedOnHandler = () => {
    Cti.getList('agent');
  }

  _onUserConfigUpdate = function(data) {
    $("#stream").append(JSON.stringify(data, null, 2) + "\n");

    this.agentId = data.agentId;
    this.userId = data.userId;
  }

  _onAgentState = function(data) {
    let agent = this.agents.filter(
      k => k.id == data.agentId
    ).map(
      e => this.agentStatuses[data.agentId] = { name: e.firstName+' '+e.lastName, status: data.name }
    );
    $("#status").val(JSON.stringify(this.agentStatuses.filter(k => k != null), null, 2) + "\n");
    if(data.agentId == this.agentId) {
      this.state = data.name;
      $("#state").val(data.name);

      if(this.state === "AgentLoggedOut") {
        $("#toggleACD").text("Login ACD");
      } else {
        $("#toggleACD").text("Logout ACD");
      }
    }
  }

  toggleACD = function() {
    if(this.state === "AgentLoggedOut") {
      Cti.loginAgent(this.phoneNumber, this.agentId);
    } else {
      Cti.logoutAgent(this.agentId);
    }
  };

  _onSheetReceived = (data) => {
    window.open(data.popupUrl);
    console.trace(data);
  }

  dial = () => {
    var num = $("#dialPhoneNumber").val();
    Cti.dial(num);
  };

  hangup = () => {
    Cti.hangup();
  };

  logMeIn = () => {
    console.log("logging in 192.168.56.3:8090/api/2.0/auth/login");

    var login = $("#login").val();
    var password = $("#password").val();
    var phoneNumber = $("#phoneNumber").val();
    var payload = {login: login, password: password};


    $.ajax("http://192.168.56.3:8090/xuc/api/2.0/auth/login",
           {
             type: 'POST',
             data: JSON.stringify(payload),
             contentType: 'application/json',
             dataType: 'json',
             success: function( data ) {
               var wsUrl = "ws://192.168.56.3:8090/xuc/api/2.0/cti?token=" + data.token;
               Cti.WebSocket.init(wsUrl, data.login, phoneNumber);
             },
             error: function(resp) {

               if(typeof(resp.responseJSON) !== "undefined") {
                 var data = resp.responseJSON;
                 $("#response").html("Login error: " + data.message + "(" + data.error + ")");
               } else {
                 $("#response").html("No response from server");
               }
             }
           });
  };

  _onAgentList = function(data) {
    this.agents = data;
      Cti.getAgentStates();
    };
    
  }