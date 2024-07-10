import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Неверная почта').isEmail(),
    body('password', 'Неверный пароль').isLength({ min: 8 }),
];

export const registerStudentValidation = [
    body('fullName', 'Укажите корректное имя').isLength({ min: 3 }),
    body('birthday', 'Укажите дату рождения в формате DD.MM.YYYY').isLength({ min: 10, max: 10 }).matches(/^\d{2}\.\d{2}\.\d{4}$/),
    body('email', 'Неверный формат почты').isEmail(),
    body('tgID', 'Укажите Telegram ID пользователя').isLength({ min: 2 }),
    body('status', 'Неверный статус').isLength({ min: 5 }),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const registerUserValidation = [
    body('fullName', 'Укажите корректное имя').isLength({ min: 3 }),
    body('password', 'Пароль должен состоять хотя бы из 8 симовлов').isLength({ min: 8 }),
    body('birthday', 'Укажите дату рождения в формате DD.MM.YYYY').isLength({ min: 10, max: 10 }).matches(/^\d{2}\.\d{2}\.\d{4}$/),
    body('email', 'Неверный формат почты').isEmail(),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const createAttendanceValidation = [
    body('studentId', 'studentId неверный').isLength({ min: 24, max: 24 }),
    body('day', 'День в формате DD.MM.YYYY').isLength({ min: 10, max: 10 }).matches(/^\d{2}\.\d{2}\.\d{4}$/),
    body('marks', 'Отметки отсутвуют').isArray(),
    body('comment', 'Комментарий отсутствует').optional().isString(),
];