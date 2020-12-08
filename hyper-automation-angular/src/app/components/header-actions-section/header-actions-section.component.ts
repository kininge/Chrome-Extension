/// <reference types="chrome"/>
import { Component, OnInit } from '@angular/core';
import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-actions-section',
  templateUrl: './header-actions-section.component.html',
  styleUrls: ['./header-actions-section.component.scss']
})
export class HeaderActionsSectionComponent implements OnInit 
{
  public projectName: string= "Hyper-Automation";
  public recordOrStop: string= "Record";
  faPlayCircle= faPlayCircle;
  faStopCircle= faStopCircle;

  constructor() { }

  async ngOnInit() 
  {
    const status= await localStorage.getItem('recordOrStop');
    this.recordOrStop= ((status== null) || (status== 'Record'))? 'Stop': 'Record';
  }
  
  async recordUserActions()
  {
    if(this.recordOrStop.toLowerCase().trim()== "record")
    {
      this.recordOrStop= "Stop";
      await localStorage.setItem('recordOrStop', 'Record');
    }
    else
    {
      this.recordOrStop= "Record";
      await localStorage.setItem('recordOrStop', 'Stop');
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
    {
      console.log('tabId: '+tabs[0].id);

      chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"});
    });
  }
}
