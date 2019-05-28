import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


declare var Cti: any;

type agents = Array<{ id: number, firstName: string, lastName: string }>;
type agentStatuses = Array<{ name: string, status: string }>;
type agent = { agentId: number, name: string };


@Component({
  selector: 'callComponent',
  templateUrl: './callComponent.component.html',
  styleUrls: ['./callComponent.component.css']
})

export class CallComponent {

  constructor(private http: HttpClient) {
    this.ACDtoggle = 'Agent logged out';
    this.http = http;
    this.Cti = Cti;
    this.Cti.setHandler(this.Cti.MessageType.USERCONFIGUPDATE, this._onUserConfigUpdate);
    this.Cti.setHandler(this.Cti.MessageType.AGENTSTATEEVENT, this._onAgentState);
    this.Cti.setHandler(this.Cti.MessageType.LOGGEDON, this._loggedOnHandler);
    this.Cti.setHandler(this.Cti.MessageType.AGENTLIST, this._onAgentList);
    this.Cti.setHandler(this.Cti.MessageType.SHEET, this._onSheetReceived);
  }

  public agentStatuses: agentStatuses = [];
  public agents: agents = [];

  public errorMessage: string;
  public phoneNumber: string;
  public ACDtoggle: string;
  public dialNumber: string;
  public ACDstate: string;
  public agentId: number;
  public userId: number;
  public status: string;
  public stream: string;
  public state: string;
  public host: string;

  private Cti: any;

  _onAgentState = (data: agent) => {
    this.agents.filter(
      a => a.id == data.agentId)
      .map(
        e => this.agentStatuses[data.agentId] = { name: e.firstName + ' ' + e.lastName, status: data.name });

    this.status = JSON.stringify(this.agentStatuses.filter(k => k != null), null, 2) + "\n";
    if (data.agentId == this.agentId) {
      this.state = data.name;
      this.ACDstate = data.name;

      if (this.state === "AgentLoggedOut") {
        this.ACDstate = 'Agent logged out';
        this.ACDtoggle = 'Login'
      } else {
        this.ACDstate = 'Agent ready';
        this.ACDtoggle = 'Logout'
      }
    }
  }

  _loggedOnHandler = () => {
    this.Cti.getList('agent');
  }

  _onUserConfigUpdate = (data: { agentId: number, userId: number }) => {
    this.stream = JSON.stringify(data, null, 2) + "\n";

    this.agentId = data.agentId;
    this.userId = data.userId;
  }

  toggleACD = () => {
    if (this.state === "AgentLoggedOut") {
      this.Cti.loginAgent(this.phoneNumber, this.agentId);
    } else {
      this.Cti.logoutAgent(this.agentId);
    }
  };

  _onSheetReceived = (data: { popupUrl: string }) => {
    window.open(data.popupUrl);
    console.trace(data);
  }

  dial = () => {
    this.Cti.dial(this.dialNumber);
  };

  hangup = () => {
    this.Cti.hangup();
  };

  _onAgentList = (data: agents) => {
    this.agents = data;
    this.Cti.getAgentStates();
  };

}