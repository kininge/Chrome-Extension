/// <reference types="chrome"/>
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent 
{
  private chromeExtensionId: string= "dpbgbliebnhipffejmeiolgdnagahjhb";
  private requestSended: boolean= false;
  private responseGeted: boolean= false;
  private message: string= undefined;
  
  async sendMessage()
  {
    this.requestSended= true;
    let responseBindVariable= function(response)
    {
      this.setResopnse(response.message);
    }
    
    chrome.runtime.sendMessage(this.chromeExtensionId, { request: "getDOM" }, responseBindVariable.bind(this));

  }

  setResopnse(response)
  {
    this.responseGeted= true;
    this.message = response;
    console.log(this.message);
    this.message= "Hi there";
  }
}
