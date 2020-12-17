import { Component, Output, OnInit, OnChanges, SimpleChanges, EventEmitter, ElementRef, ViewChild, Input } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserAction } from 'src/app/interfaces/user-action';
import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { TestCaseAddress } from 'src/app/interfaces/test-case-address';

@Component({
  selector: 'app-user-actions-section',
  templateUrl: './user-actions-section.component.html',
  styleUrls: ['./user-actions-section.component.scss']
})
export class UserActionsSectionComponent implements OnInit
{
  @ViewChild('userActionParentView', {static: false}) userActionParent: ElementRef;
  @Input() testCaseAddress: TestCaseAddress= undefined;
  @Input() userActionsData: UserAction[]= [];

  public extensionId: string= 'pbcgpdcmgjgophdjifeahopggdfdkaba';

  public projectName: string= "Hyper-Automation";
  public recordOrStop: string= "Record";
  faPlayCircle= faPlayCircle;
  faStopCircle= faStopCircle;
  faTrash= faTrash;

  
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

  /* notify to content page to listen or not */
  async notifyContentPage()
  {
    if(this.recordOrStop.toLowerCase().trim()== "record")
    {
      chrome.runtime.sendMessage(this.extensionId.trim(), {chromeExtension: false}, this.emitTheData.bind(this));
    }
    else
    {
      this.removeAllUserActions();
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

    for(let index= 0; index< this.userActionsData.length; index++)
    {
      this.inserUserAction(this.userActionsData[index]);
    }
  }

  inserUserAction(userAction: UserAction)
  {
    console.log(this.userActionParent.nativeElement);

    /* Create whole user actio row */
    var userActionRow= document.createElement("DIV");
    userActionRow.setAttribute("id", userAction.stepId.toString());
    userActionRow.className= "user-action-data-conatainer";

    /* create user action row */
    var newUserAction = document.createElement("DIV");
    newUserAction.className= "action";

    var child1= document.createElement("DIV");
    child1.className= "user-action-data-data user-action-data";
    child1.innerHTML= userAction.userAction;

    var child2= document.createElement("DIV");
    child2.className= "user-action-data-data label-data";
    child2.innerHTML= userAction.label;

    var child3= document.createElement("DIV");
    child3.className= "user-action-data-data value-data";
    child3.innerHTML= userAction.value;

    // var child4= document.createElement("FA-ICON");
    // child4.className= "user-action-data-data user-action-remove";
    // child4.setAttribute("\u005Bicon\u005D", "faTrash");
    // child4.setAttribute("id", userAction.stepId.toString());
    // child4.setAttribute("\u0028click\u0029", "removeUserAction($event)");

    newUserAction.appendChild(child1);
    newUserAction.appendChild(child2);
    newUserAction.appendChild(child3);
    // newUserAction.appendChild(child4);

    userActionRow.appendChild(newUserAction);

    console.log(newUserAction);

    this.userActionParent.nativeElement.appendChild(userActionRow);
  }

  removeAllUserActions()
  {
    while (this.userActionParent.nativeElement.firstChild) 
    {
      this.userActionParent.nativeElement.removeChild(this.userActionParent.nativeElement.firstChild);
    }
  }
}
