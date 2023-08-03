const routes = require('express').Router();
const validate = require('./validators');

const ctrl = require('./ctrl');

routes.get(
    '/',
    ctrl.findMultiple
);

routes.get(
    '/:userId',
    validate.findSingle,
    validate.validateReq,
    ctrl.findSingle
);

routes.post(
    '/',
    validate.create,
    validate.validateReq,
    ctrl.create
);

routes.patch(
    '/:userId',
    validate.update,
    validate.validateReq,
    ctrl.update
);

routes.delete(
    '/',
    ctrl.deleteMultiple
);

routes.delete(
    '/:userId',
    validate.deleteSingle,
    validate.validateReq,
    ctrl.deleteSingle
);

module.exports = routes;