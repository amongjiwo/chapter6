const express = require("express");
const { User, Profile, History } = require("../models");
const dummy = [];
const router = express.Router();

router.get("/home", (req, res) => {
  res.render("pages/home/index");
});

/** START PRODUCTS ROUTE */

router.get("/users", (req, res) => {
  User.findAll().then((users) => {
    res.render("pages/users/index", {
      pageTitle: "User Game",
      users,
    });
  });
});

router.get("/users/create", (req, res) => {
  res.render("pages/users/create", {
    pageTitle: "Create User"
  });    
});

router.post("/users", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,  
  }).then(() => {
    res.redirect("/users");
  });
});

router.get("/users/:id", (req, res) => {
  Product.findOne({
    where: { id: req.params.id },
  }).then((user) => {
    res.render("pages/users/show", {
      pageTitle: `User: ${user.name}`,
      user,
    });
  });
});

router.get("/users/:id/edit", async (req, res) => {
  User.findOne({
    where: { id: req.params.id },
  }).then((user) => {
    res.render("pages/user/edit", {
      pageTitle: "Edit User",
      user,
    });
  });    
});

router.put("/users/:id", (req, res) => {
  User.update(
    {
      username,
      password
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(() => {
    res.redirect("/users");
  });
});

router.delete("/users/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.redirect("back");
  });
});

/** END PRODUCTS ROUTE */

/** START SUPPLIERS ROUTE */

router.get("/profiles", (req, res) => {
  Profile.findAll({
    order: [["name", "ASC"]],
    include: ["user"],
  }).then((profiles) => {
    res.render("pages/profiles/index", {
      pageTitle: "User Profile",
      profiles,
    });
  });
});

router.get("/profiles/create", (req, res) => {
  User.findAll({
    order: [["name", "ASC"]],
  }).then((users) => {
    res.render("pages/profiles/create", { pageTitle: "Create Profile",
  users,
 });
  });
});

router.post("/profiles", (req, res) => {
  const { name, phoneNumber, email, userId } = req.body;

  Profile.create({
    name,
    phoneNumber,
    email,
    userId,
  }).then(() => {
    res.redirect("/profiles");
  });
});

router.get("/profiles/:id", (req, res) => {
  Profile.findOne({
    where: { id: req.params.id },
    include: ["user"],
  }).then((profile) => {
    res.render("pages/profiles/show", {
      pageTitle: `User: ${profile.name}`,
      profile,
    });
  });
});

router.get("/profiles/:id/edit", async (req, res) => {
  const profile = await Profile.findOne({
    where: { id: req.params.id },
  });

  const users = await User.findAll({
    order: [["name", "ASC"]],
  });

  res.render("pages/profiles/edit", {
    pageTitle: "Edit Profile",
    profile,
    users,
  }); 
});

router.delete("/profiles/:id", (req, res) => {
  Profile.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.redirect("back");
  });
});

/** END SUPPLIERS ROUTE */

router.get("/login", (req, res) => {
  res.render("pages/login/login");
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  dummy.push({
    username,
    password,
  });
  console.log(dummy);
  if (username === "alan" && password === "admin") {
    res.redirect("/users");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
