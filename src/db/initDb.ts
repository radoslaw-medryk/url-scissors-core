import { pool } from "./pool";
import { createShortUrlSql, dropShortUrlSql } from "./models/ShortUrlDb";
import { dbconfig } from "@/configs/dbconfig";

export const initDb = async () => {
    const { recreateTables } = dbconfig;

    if (recreateTables) {
        await pool.query(dropShortUrlSql);
    }

    await pool.query(createShortUrlSql);
};
