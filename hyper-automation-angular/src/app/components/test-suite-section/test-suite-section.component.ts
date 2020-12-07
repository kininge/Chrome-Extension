import { Component, OnInit } from '@angular/core';
import { faPlus, faAngleRight, faAngleDown, faFont, faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons'
import { TestSuite } from 'src/app/interfaces/test-suite';
import { TestCase } from 'src/app/interfaces/test-case';

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
  public testSuiteIndex: number= undefined;
  public testCaseIndex: number= undefined;


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

  addNewTestSuite()
  {
    this.modelTitle= "Create name for test suite"
    
    this.showModal();
  }

  addNewTestCase(testSuiteIndex: number)
  {
    this.testSuiteIndex= testSuiteIndex;

    this.modelTitle= "Create name for test case"
    
    this.showModal();
  }

  renameTestSuite(testSuiteIndex: number)
  {
    this.testSuiteIndex= testSuiteIndex;

    this.modelTitle= "Rename test suite"
    this.rename= this.allTestSuites[testSuiteIndex].testSuiteName;

    this.showModal();
  }

  renameTestCase(testSuiteIndex: number, testCaseIndex: number)
  {
    this.testSuiteIndex= testSuiteIndex;
    this.testCaseIndex= testCaseIndex;

    this.modelTitle= "Rename test case"
    this.rename= this.allTestSuites[testSuiteIndex].testSuiteData[testCaseIndex].testCaseName;
    
    this.showModal();
  }

  showTestCase(testSuiteIndex: number, testCaseIndex: number)
  {
    console.log(this.allTestSuites[testSuiteIndex].testSuiteData[testCaseIndex]);
  }

  showModal()
  {
    let modal= document.getElementById("create-or-rename-test-suite-or-test-case");
    modal.style.display= "block";
  }

  closeModal()
  {
    let modal =document.getElementById("create-or-rename-test-suite-or-test-case");
    modal.style.display= "none";
    this.rename= undefined;
  }

  saveName()
  {
    const testSuite: TestSuite= 
    {
      isExpanded: false,
      testSuiteName: this.rename,
      testSuiteData: []
    }

    const testCase: TestCase=
    {
      testCaseName: this.rename,
      testCaseData: []
    }

    if(this.modelTitle== "Create name for test suite")
    {
      this.allTestSuites.push(testSuite);
    }
    else if(this.modelTitle== "Rename test suite")
    {
      this.allTestSuites[this.testSuiteIndex].testSuiteName= this.rename;
    }
    else if(this.modelTitle== 'Create name for test case')
    {
      this.allTestSuites[this.testSuiteIndex].testSuiteData.push(testCase);
    }
    else
    {
      this.allTestSuites[this.testSuiteIndex].testSuiteData[this.testCaseIndex].testCaseName= this.rename;
    }
    
    this.rename= undefined;
    this.closeModal();

    console.log(this.allTestSuites);
  }

  renameStatus()
  {
    let saveButton= document.getElementById("modal-save-button");

    if(this.rename)
    {
      saveButton.style.backgroundColor= "#15c39a";
      saveButton.style.color= "#ffffff";
      return false; 
    }
    else
    {
      saveButton.style.backgroundColor= "#bebebe";
      return true;
    }
  }

}
