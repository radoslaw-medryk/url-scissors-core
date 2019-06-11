import { sql } from "slonik";

export type ShortUrlDbId = string;

export const tableShortUrl = sql.identifier(["ShortUrls"]);

export const dropShortUrlSql = sql`
    DROP TABLE IF EXISTS ${tableShortUrl} CASCADE;
`;

export const createShortUrlSql = sql`
    CREATE TABLE IF NOT EXISTS ${tableShortUrl} (
        "id" varchar(32) PRIMARY KEY,
        "url" varchar(8192) NOT NULL
    );
`;
