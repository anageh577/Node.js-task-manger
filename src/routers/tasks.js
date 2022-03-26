const express = require("express");
const Task = require("../models/task");
const router = new express.Router();
const auth = require("../middleware/auth");
router.post("/tasks", auth, (req, res) => {
  const task = new Task(req.body);
  task.Owner = req.user._id;
  task
    .save()
    .then(() => {
      res.send(task);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});
router.get("/tasks", auth, async (req, res) => {
  console.log(req.user._id);
  await req.user.populate("tasks").execPopulate();
  res.send(req.user.tasks);
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send("not found");
    }

    res.send({ task, user: req.user });
  } catch (error) {
    res.status(500).send(`not found ${e}`);
  }
});
router.patch("/task/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
