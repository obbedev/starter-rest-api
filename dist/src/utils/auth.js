import { Query } from "../database/operation/query.js";
import { getConnection } from "../database/database.js";
import { Filter } from "../database/operation/filter.js";
import { SessionService } from "../services/session.service.js";
export const isLogged = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        if (token && (typeof token === 'string' || token instanceof String)) {
            let query = new Query('api_user', 'id,email');
            let filter = new Filter();
            filter.addEqualFilter("token", token);
            query.addFilter(filter);
            const db = getConnection();
            await db.query(query.toString(), (error, results) => {
                if (results && results.rows && results.rows.length > 0) {
                    SessionService.setUserData(results.rows[0]);
                    next();
                }
                else {
                    res.status(401).json({
                        error: 'Invalid user ID'
                    });
                }
            });
        }
        else {
            throw new Error("Could not get token");
        }
    }
    catch (e) {
        console.log(e);
        res.status(401).json({
            error: 'Invalid user ID'
        });
    }
};
