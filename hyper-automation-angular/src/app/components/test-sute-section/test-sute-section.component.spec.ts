import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSuteSectionComponent } from './test-sute-section.component';

describe('TestSuteSectionComponent', () => {
  let component: TestSuteSectionComponent;
  let fixture: ComponentFixture<TestSuteSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSuteSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSuteSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
