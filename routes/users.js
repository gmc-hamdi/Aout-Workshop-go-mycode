const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
//route localhost:5000/user/register
//@desc register new user
//aceess public

router.post("/register", (req, res) => {
  const { login, email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      return res.json({ msg: "user already exist" });
    } else {
      const newuser = new User({ login, email, password });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newuser.password, salt, (err, hash) => {
          newuser.password = hash;
          newuser
            .save()
            .then(user => res.send(user))
            .catch(err => {
              res.send(err);
            });
        });
      });
    }
  });
});

//route localhost:5000/user/login
//@desc login user
//access public

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.json({ msg: "email not exist" });
    } else {
      bcrypt.compare(password, user.password).then(isMatched => {
        if (isMatched) {
          const payload = { id: user.id, email: user.email };
          jwt.sign(
            payload,
            config.get("secretkey"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({ token: "Bearer " + token });
            }
          );
        } else {
          return res.json({ msg: "password incorrect" });
        }
      });
    }
  });
});

//route localhost:5000/user/current
//@desc verif user
//access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
