import { TestCase } from './test-case';

export interface TestSuite 
{
    status: boolean;
    testSuiteName: string;
    testSuiteData: TestCase[];
}
