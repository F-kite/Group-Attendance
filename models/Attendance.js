import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    creatorMark: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    marks: {
        type: Array,
        default: [],
    },
    comment: {
        type: String,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Attendance', AttendanceSchema);