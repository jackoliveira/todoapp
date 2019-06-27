const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const taskController = require('../controllers/taskController');

router.get('/', taskController.index);
router.get('/tomorrow', taskController.tomorrowTasks);
router.get('/finished', taskController.finishedTasks);

router.post('/create/:tag', taskController.create);
router.get('/delete/:id', taskController.delete);
router.get('/finish/:id', taskController.finishTask);
router.post('/new', taskController.create);
router.get('/show/:id', taskController.show);

module.exports = router;
