/* eslint-disable no-unused-expressions */
const mongoose = require('mongoose');

const Task = mongoose.model('Task');

module.exports = {
  async index(req, res) {
    const tasks = await Task.find({tag: 'today'});
    res.render('tasks/index', {tasks: tasks.reverse()});
  },

  async tomorrowTasks(req, res) {
    const tasks = await Task.find({tag: 'tomorrow'});
    res.render('tasks/tomorrow', {tasks: tasks.reverse()});
  },

  async finishedTasks(req, res) {
    const tasks = await Task.find({tag: 'finished'});
    res.render('tasks/finished', {tasks: tasks.reverse()});
  },

  async create(req, res) {
    const {tag} = req.params;
    if (tag === 'today' || tag === 'tomorrow') {
      await Task.create({
        name: req.body.name,
        tag: req.params.tag,
      });
      tag === 'today' ? res.redirect('/') : res.redirect('/tomorrow');
    } else {
      res.send('not a valid form');
    }
  },

  async finishTask(req, res) {
    await Task.findById(req.params.id, (err, task) => {
      const taskOldTag = task.tag;
      if (err) {
        res.send('error, no entry found');
      }
      // eslint-disable-next-line no-param-reassign
      task.tag !== 'finished' ? task.tag = 'finished' : task.tag = 'today';
      task.save();
      if (taskOldTag === 'today') {
        res.redirect('/');
      } else {
        res.redirect('/tomorrow');
      }
    });
  },

  async show(req, res) {
    const task = await Task.findById(req.params.id);
    res.render('tasks/show', {task});
  },

  async delete(req, res) {
    await Task.findById(req.params.id, (err, task) => {
      const taskTag = task.tag;
      if (err) {
        res.send('error, no entry found');
      }
      task.remove(task.id);
      if (taskTag === 'today') {
        res.redirect('/');
      } else {
        res.redirect('/tomorrow');
      }
    });
  },

};
