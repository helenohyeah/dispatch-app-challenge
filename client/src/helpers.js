import isEqual from 'lodash.isequal';
import omit from 'lodash.omit';


// Returns true if given task exists in tasks
export function isDuplicateTask(tasks, taskToCheck) {
  return tasks.some(task => isEqual(omit(task, ['id']), taskToCheck));
}