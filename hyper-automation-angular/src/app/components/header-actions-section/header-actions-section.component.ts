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

  ngOnInit() 
  {
    
  }
  
  async recordUserActions()
  {
    if(this.recordOrStop.toLowerCase().trim()== "record")
    {
      this.recordOrStop= "Stop";
      chrome.storage.sync.set({record: false});
    }
    else
    {
      this.recordOrStop= "Record";
      chrome.storage.sync.set({record: true});
    }
  }
}
