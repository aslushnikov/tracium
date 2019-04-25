const {MainThreadTasks} = require('./lib/main-thread-tasks.js');

function cleanup(task) {
  for (const child of task.children)
    cleanup(child);

  if (task.group) {
    task.groupId = task.group.id;
    task.group = null;
  } else {
    console.log(task);
  }
  delete task.attributableURLs;
}

function process(trace) {
  const tasks = MainThreadTasks.compute(trace);
  tasks.forEach(cleanup);
  return tasks;
}

module.exports = {process};
