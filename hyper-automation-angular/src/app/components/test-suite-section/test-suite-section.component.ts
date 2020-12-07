import { Component, OnInit } from '@angular/core';
import { faPlus, faAngleRight, faAngleDown, faFont, faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons'
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
      isExpanded: false,
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
      isExpanded: false,
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
  public modelTitle: string= undefined;
  public rename: string= undefined;
  public status: boolean = true;

  faPlus= faPlus;
  faAngleRight= faAngleRight;
  faAngleDown= faAngleDown;
  faFont= faFont;
  faPlay= faPlay;
  faFile= faFile;
  faTimes= faTimes;

  constructor() { }

  ngOnInit() {}

  expandTestSuite(testSuiteIndex: number)
  {
    this.allTestSuites[testSuiteIndex].isExpanded= this.allTestSuites[testSuiteIndex].isExpanded? false: true;
  }

  showTestCase(testSuiteIndex: number, testCaseIndex: number)
  {
    console.log(this.allTestSuites[testSuiteIndex].testSuiteData[testCaseIndex]);
  }

  addNewTestSuite()
  {
    this.modelTitle= "Create name for test suite"
    let modal =document.getElementById("create-or-rename-test-suite-or-test-case");
    modal.style.display= "block";
  }

  closeModal()
  {
    let modal =document.getElementById("create-or-rename-test-suite-or-test-case");
    modal.style.display= "none";
  }

  saveName()
  {
    const testSuite: TestSuite= 
    {
      isExpanded: false,
      testSuiteName: this.rename,
      testSuiteData: []
    }

    this.allTestSuites.push(testSuite);
    this.rename= undefined;
    this.closeModal();
  }

  renameStatus()
  {
    let saveButton= document.getElementById("modal-save-button");

    if(this.rename)
    {
      saveButton.style.backgroundColor= "#15c39a";
      return false;
      
    }
    else
    {
      saveButton.style.backgroundColor= "#6D758D";
      return true;
    }
  }

}
