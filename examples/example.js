const fs = require('fs');
const Tracium = require('..');

const tasks = Tracium.computeMainThreadTasks(require('./site-with-redirect.trace.json'), {
  flatten: true,
});

let totalScriptTime = 0;
for (const task of tasks) {
  if (task.kind === 'scriptEvaluation' || task.kind === 'scriptParseCompile')
    totalScriptTime += task.selfTime;
}

console.log(`Total javascript time: ${Math.round(totalScriptTime*100)/100}ms`);

