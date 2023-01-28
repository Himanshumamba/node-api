const userDB = {
  users: require('../model/user.json'),
  setUser: function (data) {
    this.user = data;
  },
};

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUSer = (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ message: 'username and password Not found' });

  const duplicate = userDB.users.find((person) => person.username === username);
  if (duplicate) return res.sendStatus(409);
  try {
    const hashPswd = bcrypt.hash(pwd, 10);
    const newUser = { username: user, password: hashPswd };
    userDb.setUsers([...userDB.users, newUser]);

    fsPromises.writeFiles(
      path.join(__dirname, '..', 'model', users.json),
      JSON.stringify(userDb.users)
    );

    console.log(userDB.users);
    res.status(201).json({ success: `New user created ${user}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUSer };
