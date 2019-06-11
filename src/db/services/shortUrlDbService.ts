import { ShortUrlDbId, tableShortUrl } from "../models/ShortUrlDb";
import { sql } from "slonik";
import { pool } from "../pool";
import { randomString } from "@/helpers/randomString";
import { urlconfig } from "@/configs/urlconfig";

class ShortUrlDbService {
    public async create(url: string): Promise<ShortUrlDbId> {
        // TODO [RM]: validate `url`

        const { idLength, idCharset } = urlconfig;
        const id = randomString(idLength, idCharset);

        // Note: this generated `id` is not guaranteed to be unique. There is small chance of collision.
        // In case of collision INSERT will fail due to PK constraint, and we will retry.

        const query = sql`
            INSERT INTO ${tableShortUrl} ("id", "url") VALUES (${id}, ${url});
        `;

        try {
            await pool.query(query);
        } catch (e) {
            // TODO [RM]: handle, retry
            throw e;
        }

        return id;
    }

    public async resolve(id: ShortUrlDbId) {
        // TODO [RM]: validate `id` for sanity

        const query = sql`
            SELECT "url" FROM ${tableShortUrl} WHERE "id" = ${id};
        `;

        // TODO [RM]: check if returning string | undefined;
        const result = ((await pool.maybeOneFirst(query)) || undefined) as string | undefined;
        return result;
    }
}

export const shortUrlDbService = new ShortUrlDbService();
