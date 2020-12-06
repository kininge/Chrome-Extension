import { Component, OnInit } from '@angular/core';
import { faPlus, faAngleRight, faAngleDown, faFont, faPlay, faFile } from '@fortawesome/free-solid-svg-icons';
import { TestSuite } from 'src/app/interfaces/test-suite';

@Component
({
  selector: 'app-test-suite-section',
  templateUrl: './test-suite-section.component.html',
  styleUrls: ['./test-suite-section.component.scss']
})

export class TestSuiteSectionComponent implements OnInit 
{
  public allTestSuites: TestSuite[]=
  [
    {
      status: false,
      testSuiteName: "Untitled Test Suite",
      testSuiteData: 
      [
        {
          testCaseName: "Untitled Test Case",
          testCaseData: 
          [
            { stepId: 1, userActionType: "click", targetElement: "bla bla bla", value: null },
            { stepId: 2, userActionType: "Hover", targetElement: "bla bla bla", value: null },
            { stepId: 3, userActionType: "type", targetElement: "bla bla bla", value: "Somthing" },
            { stepId: 4, userActionType: "click", targetElement: "bla bla bla", value: null },
            { stepId: 5, userActionType: "Hover", targetElement: "bla bla bla", value: null }
          ]
        },
        {
          testCaseName: "Untitled Test Case",
          testCaseData: 
          [
            { stepId: 1, userActionType: "click", targetElement: "bla bla bla", value: null },
            { stepId: 2, userActionType: "click", targetElement: "bla bla bla", value: null },
            { stepId: 3, userActionType: "Hover", targetElement: "bla bla bla", value: null }
          ]
        },
        {
          testCaseName: "Untitled Test Case",
          testCaseData: 
          [
            { stepId: 1, userActionType: "click", targetElement: "bla bla bla", value: null },
            { stepId: 2, userActionType: "Hover", targetElement: "bla bla bla", value: null },
            { stepId: 3, userActionType: "type", targetElement: "bla bla bla", value: "Somthing" }
          ]
        }
      ]
    },
    {
      status: false,
      testSuiteName: "Untitled Test Suite",
      testSuiteData: 
      [
        {
          testCaseName: "Untitled Test Case",
          testCaseData: 
          [
            { stepId: 1, userActionType: "click", targetElement: "bla bla bla", value: null },
            { stepId: 2, userActionType: "Hover", targetElement: "bla bla bla", value: null },
            { stepId: 3, userActionType: "type", targetElement: "bla bla bla", value: "Somthing" },
            { stepId: 4, userActionType: "click", targetElement: "bla bla bla", value: null },
            { stepId: 5, userActionType: "Hover", targetElement: "bla bla bla", value: null }
          ]
        },
        {
          testCaseName: "Untitled Test Case",
          testCaseData: 
          [
            { stepId: 1, userActionType: "click", targetElement: "bla bla bla", value: null },
            { stepId: 2, userActionType: "click", targetElement: "bla bla bla", value: null },
            { stepId: 3, userActionType: "Hover", targetElement: "bla bla bla", value: null }
          ]
        }
      ]
    }
  ];
  public testSuiteTitle: string= 'Test Suites';
  faPlus= faPlus;
  faAngleRight= faAngleRight;
  faAngleDown= faAngleDown;
  faFont= faFont;
  faPlay= faPlay;
  faFile= faFile;

  constructor() { }

  ngOnInit() {}

  expandTestSuite(testSuiteIndex: number)
  {
    this.allTestSuites[testSuiteIndex].status= this.allTestSuites[testSuiteIndex].status? false: true;
  }

  showTestCase(testSuiteIndex: number, testCaseIndex: number)
  {
    console.log(this.allTestSuites[testSuiteIndex].testSuiteData[testCaseIndex]);
  }

}
