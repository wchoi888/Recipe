// import user model
const { User } = require("../models");
// import sign token function from auth
const { signToken } = require("../utils/auth_old");

module.exports = {
  // get a single user by either their id or their username
  async getallUser({ user = null, params }, res) {
    // const users = await User.findAll();
    const users = await User.find();

    if (!users) {
      return res.status(400).json({ message: "Cannot find users" });
    }

    res.json(users);
  },

  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [
        { _id: user ? user._id : params.id },
        { username: params.username },
      ],
    });

    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "Cannot find a user with this id!" });
    }

    res.json(foundUser);
  },
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  //
  async createUser(req, res) {
    const user = await User.create(req.body);

    if (!user) {
      return res.status(400).json({ message: "Something is wrong!" });
    }
    // const token = signToken(user);
    // res.json({ token, user });
    res.json(user);
  },
  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login({ body }, res) {
    try {
      const user = await User.findOne({
        $or: [{ username: body.username }, { email: body.email }],
      });
      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        return res.status(400).json({ message: "Wrong password!" });
      }
      const token = signToken(user);
      res.json({ token, user });
    } catch (error) {
      console.error(error);
    }
  },
  // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function

  // remove a book from `savedBooks`
};
