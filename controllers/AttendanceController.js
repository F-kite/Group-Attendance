import AttendanceModel from "../models/Attendance.js";

export const create = async (req, res) => {
    try {

        const checkAttend = await AttendanceModel.findOne({ day: req.body.day, studentId: req.body.studentId });
        if (checkAttend) {
            return res.status(400).json({
                message: "Отметка о посещаемости для данного студента уже создана",
            });
        }

        const doc = new AttendanceModel({
            creatorMark: req.userId,
            studentId: req.body.studentId,
            day: req.body.day,
            marks: req.body.marks,
            comment: req.body.comment,
        });

        const attendance = await doc.save();
        res.json(attendance);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать отчет',
        })
    }
};

export const getAll = async (req, res) => {
    try {
        const attendance = await AttendanceModel.find().populate(["studentId"]).exec();
        res.json(attendance);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить отчет",
        })
    }
};

export const getOne = async (req, res) => {
    try {
        const attendId = req.params.id;
        const doc = await AttendanceModel.findOne({ _id: attendId }).populate(["studentId"]).exec();

        if (!doc) {
            return res.status(404).json({
                message: "Отчет не найден",
            });
        }
        res.json(doc);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить отчет",
        })
    }
};

export const remove = async (req, res) => {
    try {
        const attendId = req.params.id;
        const doc = await AttendanceModel.findOneAndDelete({ _id: attendId });

        if (!doc) {
            return res.status(404).json({
                message: "Отчет не найден",
            });
        }

        res.json({
            success: true,
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось удалить отчет",
        })
    }
};

export const update = async (req, res) => {
    try {
        const attendId = req.params.id;

        await AttendanceModel.updateOne(
            {
                _id: attendId,
            },
            {
                creatorMark: req.userId,
                studentId: req.body.studentId,
                day: req.body.day,
                marks: req.body.marks,
                comment: req.body.comment,
            },
        );

        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err);
        res.ststus(500).json({
            message: "Не удалось обновить отчет"
        });
    }
};