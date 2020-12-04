import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventConsoleSectionComponent } from './event-console-section.component';

describe('EventConsoleSectionComponent', () => {
  let component: EventConsoleSectionComponent;
  let fixture: ComponentFixture<EventConsoleSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventConsoleSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventConsoleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
