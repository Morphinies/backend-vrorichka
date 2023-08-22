import path from "path";
import * as fs from "node:fs";
import userService from "./UserService.js";

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

    // upload
    async uploadAvatar(req, res) {
        try {
            if (!req.files) {
                return res.status(400).json({ message: "No files uploaded" });
            }
            const file = req.files.file;
            const userId = req.body.userId;
            const newFileName = Date.now() + `_${file.name}`;
            if (!file) return res.json({ error: "Incorrect input name" });
            const pathToUserStorage = path.normalize(
                `../frontend/public/avatars/${userId}`
            );
            if (global.timerId) {
                clearTimeout(global.timerId);
            }
            global.timerId = setTimeout(async () => {
                const user = await userService.getById(userId);
                fs.access(pathToUserStorage, fs.constants.F_OK, (err) => {
                    if (!err) {
                        fs.readdir(pathToUserStorage, (err, files) => {
                            if (files.length) {
                                for (let file of files) {
                                    if (file !== user.avatar.fileName) {
                                        fs.unlink(
                                            pathToUserStorage + `/${file}`,
                                            () => {}
                                        );
                                    }
                                }
                                delete global.timerId;
                                console.log("временное хранилище очищено!");
                            }
                        });
                    }
                });
            }, 120000);

            file.mv(pathToUserStorage + `/${newFileName}`, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
                res.send({
                    fileName: newFileName,
                    filePath: `/avatars/${userId}/${newFileName}`,
                });
            });
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    }
}

export default new UserController();
