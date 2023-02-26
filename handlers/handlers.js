const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const tasksPath = path.resolve(__dirname, '..', 'db', 'tasks.json');

const getAll = async () => {
  try {
    const rawData = await fs.readFile(tasksPath, 'utf-8');
    return JSON.parse(rawData);
  } catch (err) {
    console.log(err.message);
  }
};

const getById = async (id) => {
  try {
    const tasksList = await getAll();
    return tasksList.find((item) => String(item.id) === String(id));
  } catch (err) {
    console.log(err.message);
  }
};
const createTask = async (title, completed) => {
  try {
    const tasks = await getAll();
    const newTask = { id: crypto.randomUUID(), title, completed };
    tasks.push(newTask);
    await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 4));
    return newTask;
  } catch (e) {
    console.log(e);
  }
};
const deleteTask = async (id) => {
  try {
    const tasks = await getAll();
    const newTask = tasks.filter((item) => String(item.id) !== String(id));
    await fs.writeFile(tasksPath, JSON.stringify(newTask, null, 4));
    return newTask;
  } catch (e) {
    console.log(e);
  }
};
const updateTask = async (id, title, completed) => {
  try {
    const tasks = await getAll();
    if (title) {
      tasks.find((item) => String(item.id) === String(id)).title = title;
    }
    if (completed) {
      tasks.find((item) => String(item.id) === String(id)).completed =
        completed;
    }
    await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 4));
    return newTask;
  } catch (er) {
    console.log(er.message);
  }
};

module.exports = {
  getAll,
  getById,
  createTask,
  deleteTask,
  updateTask,
};
