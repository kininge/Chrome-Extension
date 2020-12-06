import { TestCase } from './test-case';

export interface TestSuite 
{
    isExpanded: boolean;
    testSuiteName: string;
    testSuiteData: TestCase[];
}
