const { program } = require('commander');
const {
  getAll,
  getById,
  createTask,
  deleteTask,
  updateTask,
} = require('./handlers/handlers');

program
  .name('myCLI')
  .description('A simple CLI to manage your tasks')
  .version('1.0.0')
  .option('-m, --method <method>', 'Action to perform')
  .option('-i, --id <id>', 'Task id')
  .option('-t, --title <title>', 'Task title')
  .option('-c, --completed <completed>', 'Task completion status');

program.parse(process.arg);
const { method, id, title, completed } = program.opts();

(async () => {
  if (method === 'list') {
    const tasks = await getAll();
    console.table(tasks);
  }
  if (method === 'get') {
    const task = await getById(id);
    if (!task) {
      throw new Error(`Task by id=${id} not found`);
    }
    console.log(task);
  }
  if (method === 'create') {
    const task = await createTask(title, completed);
    const tasks = await getAll();
    console.log(task);
    console.table(tasks);
  }
  if (method === 'update') {
    const task = await updateTask(id, title, completed);
    const tasks = await getAll();
    console.log(task);
    console.table(tasks);
  }
  if (method === 'remove') {
    const delTask = await deleteTask(id);
    console.log(delTask);
    const tasks = await getAll();
    console.table(tasks);
  }
})();
