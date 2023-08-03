const _ = require('lodash');
const model = require('./model');

const ctrl = {};

ctrl.findMultiple = async (req, res, next) => {
    try {
        const results = await model.findMultiple(req);
        if(!_.isEmpty(results) && _.isArray(results)){
            return res.status(200).json(results);    
        }
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

ctrl.findSingle = async (req, res, next) => {
    try {
        const results = await model.findSingle(req);
        if(!_.isEmpty(results) && _.isArray(results)){
            return res.status(200).json(_.first(results));    
        }
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

ctrl.create = async (req, res, next) => {
    try {
        const results = await model.create(req);
        if(!_.isEmpty(results) && results?.affectedRows > 0){
            return res.status(201).json({ "msg": "Record created successfully" }); 
        }
        return res.sendStatus(400);
    } catch (error) {
        next(error);
    }
}

ctrl.update = async (req, res, next) => {
    try {
        const results = await model.update(req);
        if(!_.isEmpty(results) && results?.affectedRows > 0){
            return res.status(200).json({ "msg": "Record updated successfully" }); 
        }
        return res.sendStatus(400);
    } catch (error) {
        next(error);
    }
}

ctrl.deleteMultiple = async (req, res, next) => {
    try {
        const results = await model.deleteMultiple(req);
        if(!_.isEmpty(results) && results?.affectedRows > 0){
            return res.status(200).json({ "msg": "Record(s) deleted successfully" }); 
        }
        return res.sendStatus(400);
    } catch (error) {
        next(error);
    }
}

ctrl.deleteSingle = async (req, res, next) => {
    try {
        const results = await model.deleteSingle(req);
        if(!_.isEmpty(results) && results?.affectedRows > 0){
            return res.status(200).json({ "msg": "Record deleted successfully" }); 
        }
        return res.sendStatus(400);
    } catch (error) {
        next(error);
    }
}

module.exports = ctrl;