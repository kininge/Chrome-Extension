import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionsSectionComponent } from './user-actions-section.component';

describe('UserActionsSectionComponent', () => {
  let component: UserActionsSectionComponent;
  let fixture: ComponentFixture<UserActionsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActionsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActionsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
