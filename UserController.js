import userService from "./userService.js";

class UserController {
  //
  async getAll(req, res) {
    try {
      const users = await userService.getAll();
      res.send(users);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  // get by id
  async getById(req, res) {
    try {
      if (!req.body) return res.status(400);
      const user = await userService.getById(req.params.id);
      if (user) res.send(user);
      else res.status(404);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // edit
  async edit(req, res) {
    try {
      if (!req.body) return res.status(400);
      const user = await userService.edit(req.body);
      if (user) res.send(user);
      else res.status(404);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // edit favorites
  async editFavorites(req, res) {
    try {
      if (!req.body) return res.status(400);
      const user = await userService.editFavorites(req.body);
      if (user) res.send(user);
      else res.status(404);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // logup
  async logup(req, res) {
    try {
      if (!req.body) return res.status(400);
      const user = await userService.logup(req.body);
      if (user) res.send(user);
      else res.status(404);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // signup
  async signup(req, res) {
    try {
      if (!req.body) return res.status(400);
      const userName = await userService.signup(req.body);
      if (userName) res.send(userName);
      else res.status(404);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

export default new UserController();
