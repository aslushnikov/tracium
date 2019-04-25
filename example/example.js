const fs = require('fs');
const Tracium = require('..');

const tasks = Tracium.process(require('./site-with-redirect.trace.json'), {
  flatten: true,
});

let totalScriptTime = 0;
for (const task of tasks) {
  if (task.groupId === 'scriptEvaluation' || task.groupId === 'scriptParseCompile')
    totalScriptTime += task.selfTime;
}

console.log(`Total javascript time: ${Math.round(totalScriptTime*100)/100}ms`);

