const { executeQuery, reqPagination, reqFields, reqSort } = require('../../helpers/db');
const model = {};

model.findMultiple = async (req) => {
    try {
        let strSelect = reqFields(req.query) || `*`;

        let strOrder = reqSort(req.query);
        strOrder = strOrder ? `ORDER BY ${strOrder}` : ``;

        let strLimit = reqPagination(req.query);
        strLimit = strLimit ? `LIMIT ${strLimit}` : ``;

        let sql = `SELECT ${strSelect} FROM user_list WHERE is_deleted = 0 ${strOrder} ${strLimit}`;
        const results = await executeQuery(sql);
        return results;
    } catch (error) {
        throw error;
    }
}

model.findSingle = async (req) => {
    try {
        let userId = req.params.userId;
        let strSelect = reqFields(req.query) || `*`;
        let sql = `SELECT ${strSelect} FROM user_list WHERE is_deleted = 0 AND user_id = ?`;
        const results = await executeQuery(sql, [userId]);
        return results;
    } catch (error) {
        throw error;
    }
}

model.create = async (req) => {
    try {
        let reqBody = req.body;
        let sql = `INSERT INTO user_list SET ?`;
        let sqlData = {
            user_role: reqBody.user_role,
            full_name: reqBody.full_name,
            email_id: reqBody.email_id,
            password: reqBody.password
        };
        const results = await executeQuery(sql, [sqlData]);
        return results;
    } catch (error) {
        throw error;
    }
}

model.update = async (req) => {
    try {
        let reqBody = req.body;
        let userId = req.params.userId;
        let sql = `UPDATE user_list SET ? WHERE is_deleted = 0 AND user_id = ?`;
        let sqlData = reqBody;
        const results = await executeQuery(sql, [sqlData, userId]);
        return results;
    } catch (error) {
        throw error;
    }
}

model.deleteMultiple = async (req) => {
    try {
        let sql = `UPDATE user_list SET is_deleted = 1 WHERE is_deleted = 0`;
        const results = await executeQuery(sql);
        return results;
    } catch (error) {
        throw error;
    }
}

model.deleteSingle = async (req) => {
    try {
        let userId = req.params.userId;
        let sql = `UPDATE user_list SET is_deleted = 1 WHERE is_deleted = 0 AND user_id = ?`;
        const results = await executeQuery(sql, [userId]);
        return results;
    } catch (error) {
        throw error;
    }
}

async function multiQueryConnectionDemo(){
    try {
        const conn = await pool.getConnection();
        const tempTable = await execute(`CREATE TEMPORARY TABLE demo SELECT 1+1 AS customField`, [], conn);
        console.log(tempTable);
        let sql = `SELECT * FROM demo`;
        const results = await execute(sql, [userId], conn);
        console.log(results);
        pool.releaseConnection(conn);

        return results ? results[0] || null : null;
    } catch (error) {
        throw error;
    }
}

module.exports = model;