import { Component, Output, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserAction } from 'src/app/interfaces/user-action';
import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-actions-section',
  templateUrl: './user-actions-section.component.html',
  styleUrls: ['./user-actions-section.component.scss']
})
export class UserActionsSectionComponent implements OnInit, OnChanges 
{
  @Output() userAactionsEmit: EventEmitter<UserAction[]>= new EventEmitter<UserAction[]>();


  public extensionId: string= 'pbcgpdcmgjgophdjifeahopggdfdkaba';

  public projectName: string= "Hyper-Automation";
  public recordOrStop: string= "Record";
  faPlayCircle= faPlayCircle;
  faStopCircle= faStopCircle;
  faTrash= faTrash;

  public userActionsData: UserAction[]= [];
  public userActionTitle: string= "User Actions";
  public tableLabels: string[] =["User Action", "Targeted Element", "Value", "Remove"];

  public userAction: string= undefined;
  public targetElement: string= undefined;
  public value: string= undefined;

  constructor() { }

  async ngOnInit() 
  {
    const status= await localStorage.getItem('recordOrStop');
    console.log('status: '+status);
    this.recordOrStop= ((status== null) || (status== 'Stop'))? 'Record': 'Stop';

    this.notifyContentPage();
  }

  ngOnChanges()
  {
    console.log('value chnaged');
    console.log(this.userActionsData);
  }

  /* notify to content page to listen or not */
  async notifyContentPage()
  {
    if(this.recordOrStop.toLowerCase().trim()== "record")
    {
      chrome.runtime.sendMessage(this.extensionId.trim(), {chromeExtension: false}, this.emitTheData.bind(this));
    }
    else
    {
      chrome.runtime.sendMessage(this.extensionId, {chromeExtension: true}, this.emitTheData.bind(this));
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

  editUserAction(userActionIndex: number)
  {
    this.userAction= this.userActionsData[userActionIndex].userAction;
    this.targetElement= this.userActionsData[userActionIndex].targetedElement;
    this.value= this.userActionsData[userActionIndex].value;
  }

  removeUserAction(userActionIndex: number)
  {
    this.userActionsData.splice(userActionIndex, 1);
  }

  emitTheData(response)
  {
    console.log(response);
    this.userActionsData= response.data;
    this.userAactionsEmit.emit(this.userActionsData);
  }

  try1()
  {
    console.log(this.userActionsData);
    this.userActionsData= this.userActionsData;
  }

  
}
