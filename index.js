import express from "express";
import mongoose from "mongoose";
import multer from "multer";

import { registerUserValidation, registerStudentValidation, loginValidation, createAttendanceValidation } from "./validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, StudentController, AttendanceController, ScheduleController } from './controllers/index.js';

const url = "mongodb+srv://admin:20242018@cluster0.fecnotc.mongodb.net/Group?retryWrites=true&w=majority&appName=Cluster0";

mongoose
    .connect(url)
    .then(() => { console.log(" -- Database connected") })
    .catch((err) => { console.log("Database error!", err) });

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads");
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post("/user/login", loginValidation, handleValidationErrors, UserController.login);
app.post("/user/register", registerUserValidation, handleValidationErrors, UserController.register);
app.get("/user/me", checkAuth, UserController.getMe);

app.post("/student/register", registerStudentValidation, handleValidationErrors, StudentController.registerStudent);
app.get("/student/me", checkAuth, StudentController.getStudent);

app.post("/attendance", checkAuth, createAttendanceValidation, handleValidationErrors, AttendanceController.create);
app.get("/attendance", checkAuth, AttendanceController.getAll);
app.get("/attendance/:id", checkAuth, AttendanceController.getOne);
app.patch("/attendance/:id", checkAuth, createAttendanceValidation, handleValidationErrors, AttendanceController.update);
app.delete("/attendance/:id", checkAuth, AttendanceController.remove);

app.post("/schedule", checkAuth, ScheduleController.create);
app.get("/schedule/:id", checkAuth, ScheduleController.get);
app.delete("/schedule/:id", checkAuth, ScheduleController.remove);

app.post("/uploads", checkAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(" -- Server started");
});