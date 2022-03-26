const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer();
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/me", auth, (req, res) => {
  res.send(req.user);
  console.log(req.user);
});
router.get("/users/:id", (req, res) => {
  const id = req.query.id;
  User.findById(id)
    .then((response) => {
      if (!response) {
        return res.status(400).send();
      }
      res.send(response);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    user.save();
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.post(
  "/users/profile-picture",
  auth,
  upload.single("upload"),
  async (req, res) => {
    console.log(req.file);
    const id = req.user._id;
    const user = await User.findById(id);
    user.profile_picture = req.file.buffer;
    user.save();
    res.send({ id: req.file.buffer });
  }
);
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById("61f45b14d4498c492f4f115c");
    if (!user || !user.profile_picture) {
      res.send("error");
      throw new Error("error");
    }
    res.set("Content-type", "image/jpg");
    res.send(user.profile_picture);
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }
});
router.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send({
      message: `User deleted`,
      id: `${req.params.id}`,
      username: `${user.name}`,
    });
  } catch (e) {
    res.send(e);
  }
});

// login in
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user.getprofile());
  } catch (error) {
    res.status(400).send("not login");
  }
});

module.exports = router;
