const fs = require('fs');
const path = require('path');
const util = require('util');
const {TestRunner, Reporter, Matchers} = require('@pptr/testrunner');
const Tracium = require('..');

const readFileAsync = util.promisify(fs.readFile);
const readJSON = async filePath => {
  const text = await readFileAsync(path.join(__dirname, filePath), 'utf8');
  return JSON.parse(text);
}

const testRunner = new TestRunner();
const {describe, xdescribe, fdescribe} = testRunner;
const {it, fit, xit} = testRunner;
const {beforeAll, beforeEach, afterAll, afterEach} = testRunner;
const {expect} = new Matchers();

describe('Tracium tests', function() {
  it('should work with no FCP', async () => {
    const trace = await readJSON('no_fcp.trace.json');
    expect(Tracium.computeMainThreadTasks(trace).length).toBeGreaterThan(1);
  });
});

new Reporter(testRunner);
testRunner.run();
