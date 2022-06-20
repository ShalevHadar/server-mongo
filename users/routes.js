const express = require("express");
const { createUser, getUser } = require("./user-helper");
const router = express.Router();

// register a user
router.post("/api/users/register", async (req, res) => {
  try {
    const data = req.body;
    await createUser(data);
    res.status(201).json({ message: "user created" });
  } catch (error) {
    res
      .status(409)
      .json({ message: "cannot create the user" });
  }
});

// get user by id
router.get("/api/users/:id", async (req,res) => {
  try {
    const {id} = req.params;
    const {user, items} = await getUser(id);
    res.status(200).json({ message: "success" , user, items});
  } catch (error) {
    res
      .status(400)
      .json({ message: "cannot fetch the user" });
  }
})


module.exports = router;
