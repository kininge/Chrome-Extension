import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { TestSuteSectionComponent } from './components/test-sute-section/test-sute-section.component';
import { HeaderActionsSectionComponent } from './components/header-actions-section/header-actions-section.component';
import { UserActionsSectionComponent } from './components/user-actions-section/user-actions-section.component';
import { EventConsoleSectionComponent } from './components/event-console-section/event-console-section.component';

@NgModule
({
  declarations: 
  [
    AppComponent, TestSuteSectionComponent, HeaderActionsSectionComponent, UserActionsSectionComponent,
    EventConsoleSectionComponent
  ],
  imports: 
  [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
