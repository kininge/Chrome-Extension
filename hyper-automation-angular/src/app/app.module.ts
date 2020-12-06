import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './components/app/app.component';
import { TestSuiteSectionComponent } from './components/test-suite-section/test-suite-section.component';
import { HeaderActionsSectionComponent } from './components/header-actions-section/header-actions-section.component';
import { UserActionsSectionComponent } from './components/user-actions-section/user-actions-section.component';
import { EventConsoleSectionComponent } from './components/event-console-section/event-console-section.component';

@NgModule
({
  declarations: 
  [
    AppComponent, TestSuiteSectionComponent, HeaderActionsSectionComponent, UserActionsSectionComponent,
    EventConsoleSectionComponent
  ],
  imports: 
  [
    BrowserModule, FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
