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
  public conponentReload: boolean= true;

  getUserActions(userActions: UserAction[])
  {
    this.userActions= userActions;
    console.log(this.userActions);
  }
}
