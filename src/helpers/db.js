const { v4: uuid } = require('uuid');

async function executeQuery(sql, sqlData = [], connection = null){
    try {
        const conn = connection ? connection : pool;
        let [rows] = await conn.query(sql.trim(), sqlData || []);
        return rows;
    } catch (error) {
        throw error;
    }
}

const reqPagination = (reqQuery = null) => {
    if(reqQuery){
        const page = reqQuery?._page * 1 || 1;
        if (parseInt(reqQuery?._limit) > 0){
            let limit = reqQuery._limit * 1;
            let offset = (page - 1) * limit;
            return `${offset},${limit}`;
        }
    }
    return ``;
}

const reqFields = (reqQuery = null) => {
    return (reqQuery) ? (reqQuery?._fields || '').trim() : ``;
}

const reqSort = (reqQuery = null) => {
    if (reqQuery?._sort){
        let arrField = (reqQuery?._sort || '').split(",");
        let arrOrder = (reqQuery?._order || '').split(",");
        let arrSort = [];
        for (let i = 0; i < arrField.length; i++) {
            let field = (arrField[i]).trim() || "";
            let order = (arrOrder[i]).trim() || "";
            let t = ([field, order]).join(' ')
            arrSort.push(t.trim());
        }
        return arrSort.join(', ').trim();
    }
    return ``;
}

module.exports = {
    executeQuery,
    uuid,
    reqPagination,
    reqFields,
    reqSort
}