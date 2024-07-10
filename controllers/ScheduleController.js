import ScheduleModel from "../models/Schedule.js";
import { formatSchedule, parseSchedule } from "../utils/index.js"

export const create = async (req, res) => {
    try {
        const nameGroup = req.body.nameGroup;
        if (!nameGroup) {
            return res.status(400).json({
                message: "Неверное название группы",
            });
        }

        const url = `https://kuzstu.ru/web-content/sitecontent/studentu/raspisanie/${nameGroup}.html`;
        if (!url) {
            return res.status(400).json({
                message: "Неверная ссылка на расписание",
            });
        }

        const weekNumber = req.body.weekNumber;
        if (!weekNumber) {
            return res.status(400).json({
                message: "Не указан номер недели",
            });
        }

        const checkWeek = await ScheduleModel.findOne({ nameGroup: req.body.nameGroup, weekNumber: req.body.weekNumber });
        if (checkWeek) {
            return res.status(400).json({
                message: "Расписание на эту неделю уже в базе данных",
            });
        }


        const rawSchedule = await parseSchedule(weekNumber, url);
        const formattedSchedule = formatSchedule(rawSchedule, weekNumber, nameGroup);
        const schedule = new ScheduleModel(formattedSchedule);

        await schedule.save();

        return res.status(201).json(schedule);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать расписание',
        })
    }
};

export const get = async (req, res) => {
    try {
        const scheduleId = req.params.id;
        const doc = await ScheduleModel.findOne({ _id: scheduleId });

        if (!doc) {
            return res.status(404).json({
                message: "Расписание не найдено",
            });
        }
        res.json(doc);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить расписание",
        })
    }
};

export const remove = async (req, res) => {
    try {
        const scheduleId = req.params.id;
        const doc = await ScheduleModel.findOneAndDelete({ _id: scheduleId });

        if (!doc) {
            return res.status(404).json({
                message: "Расписание не найдено",
            });
        }

        res.json({
            success: true,
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось удалить расписание",
        })
    }
};