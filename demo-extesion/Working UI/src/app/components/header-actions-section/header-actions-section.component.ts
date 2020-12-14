/// <reference types="chrome"/>
import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { UserAction } from 'src/app/interfaces/user-action';

@Component({
  selector: 'app-header-actions-section',
  templateUrl: './header-actions-section.component.html',
  styleUrls: ['./header-actions-section.component.scss']
})
export class HeaderActionsSectionComponent implements OnInit 
{
  @Output() userActions= new EventEmitter<UserAction[]>();

  public extensionId: string= 'pbcgpdcmgjgophdjifeahopggdfdkaba';

  public projectName: string= "Hyper-Automation";
  public recordOrStop: string= "Record";
  faPlayCircle= faPlayCircle;
  faStopCircle= faStopCircle;

  constructor() { }

  async ngOnInit() 
  {
    const status= await localStorage.getItem('recordOrStop');
    this.recordOrStop= ((status== null) || (status== 'Record'))? 'Stop': 'Record';

    this.notifyContentPage();
  }

  /* notify to content page to listen or not */
  async notifyContentPage()
  {
    if(this.recordOrStop.toLowerCase().trim()== "record")
    {
      chrome.runtime.sendMessage(this.extensionId, {chromeExtension: false}, function(response) 
      {
        console.log(response);
      });
    }
    else
    {
      chrome.runtime.sendMessage(this.extensionId, {chromeExtension: true}, function(response) 
      {
        console.log(response);
      });
    }
  }
  
  /* chnage recordning status on user button click */
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

    this.notifyContentPage();
  }
}
