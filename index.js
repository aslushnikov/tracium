const {MainThreadTasks} = require('./lib/main-thread-tasks.js');

function process(trace, options) {
  const {
    flatten = false,
  } = options;
  const allTasks = MainThreadTasks.compute(trace);
  const result = [];
  for (const task of allTasks) {
    task.groupId = task.group.id;
    delete task.group;
    delete task.attributableURLs;
    if (!task.parent || flatten)
      result.push(task);
    delete task.parent;
  }
  return result;
}

module.exports = {process};
