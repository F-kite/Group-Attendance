import jwt from "jsonwebtoken";

import StudentModel from "../models/Student.js";

export const registerStudent = async (req, res) => {
    try {
        const doc = new StudentModel({
            fullname: req.body.fullName,
            birthday: req.body.birthday,
            email: req.body.email,
            tgID: req.body.tgID,
            status: req.body.status,
            avatarUrl: req.body.avatarUrl,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret',
            {
                expiresIn: "30d",
            },
        );

        res.json({
            user,
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось зарегестрироваться(",
        });
    }
};

export const getStudent = async (req, res) => {
    try {
        const user = await StudentModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }

        res.json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Нет доступа",
        });
    }
};