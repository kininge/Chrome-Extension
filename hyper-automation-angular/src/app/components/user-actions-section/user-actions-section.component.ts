import { Component, Input, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserAction } from 'src/app/interfaces/user-action';

@Component({
  selector: 'app-user-actions-section',
  templateUrl: './user-actions-section.component.html',
  styleUrls: ['./user-actions-section.component.scss']
})
export class UserActionsSectionComponent implements OnInit 
{
  @Input() userActionsData: UserAction[];

  public userActionTitle: string= "User Actions";
  public tableLabels: string[] =["User Action", "Targeted Element", "Value", "Remove"];

  public userAction: string= undefined;
  public targetElement: string= undefined;
  public value: string= undefined;

  faTrash= faTrash;
  
  constructor() { }

  ngOnInit() 
  {
    console.log(this.userActionsData);
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

}
