import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderActionsSectionComponent } from './header-actions-section.component';

describe('HeaderActionsSectionComponent', () => {
  let component: HeaderActionsSectionComponent;
  let fixture: ComponentFixture<HeaderActionsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderActionsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderActionsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
