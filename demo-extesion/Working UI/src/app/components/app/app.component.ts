import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent 
{
  public title = 'hyper-automation-angular';

  userActionsRecive(userActions)
  {
    console.log(userActions);
  }
}
