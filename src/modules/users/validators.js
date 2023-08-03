const { query, param, body } = require('express-validator');
const { validateRequest } = require('./../../middlewares/request-validation');
const regxRules = require('./../../helpers/regx-rules');

const validations = {};

validations.findSingle = [
    param('userId').trim().unescape().escape()
        .notEmpty().bail()
        .isInt()
]

validations.create = [
    body('user_role').trim().unescape().escape()
        .notEmpty().bail()
        .isIn(['user', 'admin']).withMessage('Role must be in (user, admin)'),

    body('full_name').trim().unescape().escape()
        .notEmpty(),

    body('email_id').trim().unescape().escape()
        .notEmpty().bail()
        .isEmail().withMessage('Invalid email provided'),

    body('password').trim().unescape().escape()
        .notEmpty().bail()
        .matches(regxRules.password).withMessage(('Password must have: Minimum 8 and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character'))
]

validations.update = [
    body('user_role').trim().unescape().escape()
        .isIn(['user', 'admin']).withMessage('Role must be in (user, admin)').bail()
        .optional(),

    body('full_name').trim().unescape().escape()
        .optional(),

    body('email_id').trim().unescape().escape()
        .isEmail().withMessage('Invalid email provided').bail()
        .optional(),

    body('password').trim().unescape().escape()
        .matches(regxRules.password).withMessage(('Password must have: Minimum 8 and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character'))
        .optional()
]

validations.deleteSingle = [
    param('userId').trim().unescape().escape()
        .notEmpty().bail()
        .isInt()
]

validations.validateReq = validateRequest;

module.exports = validations;