import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import userService from "./userService.js";
import * as fs from "node:fs";

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
            if (!file) return res.json({ error: "Incorrect input name" });
            const newFileName = encodeURI(userId + "-" + file.name);
            const pathToUserStorage = `C:/Users/79108/Desktop/вторичка/frontend/public/avatars/${userId}`;

            fs.access(pathToUserStorage, fs.F_OK, (err) => {
                if (!err) {
                    fs.rm(pathToUserStorage);
                    console.log("файл будет заменён");
                } else {
                    console.log("file no find");
                }
            });
            file.mv(pathToUserStorage + `/${newFileName}`, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
                console.log("file was uploaded");

                res.send({
                    fileName: file.name,
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
