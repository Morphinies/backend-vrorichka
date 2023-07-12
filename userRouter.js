import Router from "express";
import UserController from "./UserController.js";
const userRouter = new Router();

// all users
userRouter.get("", UserController.getAll);

// user by id
userRouter.get("/:id", UserController.getById);

// edit user
userRouter.put("/editUser", UserController.edit);

// edit user
userRouter.put("/editUserFavorites", UserController.editFavorites);

// logup
userRouter.post("/logup", UserController.logup);

// signup
userRouter.post("/signup", UserController.signup);

export default userRouter;
