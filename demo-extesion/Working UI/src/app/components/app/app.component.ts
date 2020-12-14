import { Component } from '@angular/core';
import { UserAction } from 'src/app/interfaces/user-action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent 
{
  public title = 'hyper-automation-angular';
  public userActions: UserAction[]= [];

  getUserActions(userActions: UserAction[])
  {
    console.log('getUserActions');
    this.userActions= userActions;
  }
}
