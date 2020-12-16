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
  public projectName: string= "Hyper-Automation";

  constructor() { }

  async ngOnInit() {}

}
