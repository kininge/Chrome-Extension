import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserAction } from 'src/app/interfaces/user-action';

@Component({
  selector: 'app-user-actions-section',
  templateUrl: './user-actions-section.component.html',
  styleUrls: ['./user-actions-section.component.scss']
})
export class UserActionsSectionComponent implements OnInit 
{
  public userActionTitle: string= "User Actions";
  public tableLabels: string[] =["User Action", "Targeted Element", "Value", "Remove"];
  public userActions: UserAction[]= 
  [
    { stepId: 1, userActionType: "click", targetElement: "bla bla bla", value: null },
    { stepId: 2, userActionType: "Hover", targetElement: "bla bla bla", value: null },
    { stepId: 3, userActionType: "type", targetElement: "bla bla bla", value: "Somthing" },
    { stepId: 4, userActionType: "click", targetElement: "bla bla bla", value: null },
    { stepId: 5, userActionType: "Hover", targetElement: "bla bla bla", value: null },
    { stepId: 6, userActionType: "type", targetElement: "bla bla bla", value: "Somthing" },
    { stepId: 7, userActionType: "click", targetElement: "bla bla bla", value: null },
    { stepId: 8, userActionType: "Hover", targetElement: "bla bla bla", value: null }
  ];

  public userAction: string= undefined;
  public targetElement: string= undefined;
  public value: string= undefined;

  faTrash= faTrash;
  
  constructor() { }

  ngOnInit() {}

  editUserAction(userActionIndex: number)
  {
    this.userAction= this.userActions[userActionIndex].userActionType;
    this.targetElement= this.userActions[userActionIndex].targetElement;
    this.value= this.userActions[userActionIndex].value;
  }

  removeUserAction(userActionIndex: number)
  {
    this.userActions.splice(userActionIndex, 1);
  }

}
