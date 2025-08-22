const { Router } = require('express');
const { createTask, listTasks } = require('../controllers/taskController');
const auth = require('../middleware/auth');
const router = Router();

router.post('/', auth, createTask);
router.get('/', listTasks);

module.exports = router;
