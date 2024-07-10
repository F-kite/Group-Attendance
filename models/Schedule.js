import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    lesson: { type: String, required: true },
    time: { type: String, required: true },
    subject: { type: Array },
    teacher: { type: Array },
});

const daySchema = new mongoose.Schema({
    date: { type: String, required: true },
    lessons: [lessonSchema]
});

const scheduleSchema = new mongoose.Schema({
    nameGroup: { type: String, required: true },
    weekNumber: { type: String, required: true },
    dateRange: { type: String, required: true },
    Monday: daySchema,
    Tuesday: daySchema,
    Wednesday: daySchema,
    Thursday: daySchema,
    Friday: daySchema,
    Saturday: daySchema
});

export default mongoose.model('Schedule', scheduleSchema);
