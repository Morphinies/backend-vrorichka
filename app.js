import express from "express";
import mongoose from "mongoose";
import userRouter from "./userRouter.js";
import prodRouter from "./prodRouter.js";
import fileUpload from "express-fileupload";
const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-with, content-type"
    );
    next();
});

app.use(express.json());
app.use(
    fileUpload({
        createParentPath: true,
    })
);
app.use("/api/users", userRouter);
app.use("/api/products", prodRouter);
app.use(express.static("./frontend/public"));

async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/mydb");
        app.listen(7000);
        console.log("сервер запущен");
    } catch (err) {
        console.log(err);
    }
}

main();

process.on("SIGINT", async () => {
    await mongoose.disconnect();
    console.log("Приложение завершило работу");
    process.exit();
});
