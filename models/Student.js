import mongoose from "mongoose";
const StudentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    tgID: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
    },
    avatarUrl: String,

}, {
    timestamps: true,
});

export default mongoose.model('Student', StudentSchema);