import { getConnection } from "../database/database.js";
import { WearEvent } from "../model/wear.event.js";
export const getItems = async (req, res) => {
    const body = req.body;
    //todo filters,limit...
    try {
        const db = getConnection();
        let dataModel = new WearEvent(db);
        let fields = [
            "id", "date", "gargement_id", "event_id",
            "(select name from event where id = event_id) AS event_name",
            "(select name from gargement where id = gargement_id) AS gargement_name"
        ];
        let result = await dataModel.findMany(null, fields);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
