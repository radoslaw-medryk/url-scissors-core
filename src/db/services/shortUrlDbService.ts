import { ShortUrlDbId, tableShortUrl } from "../models/ShortUrlDb";
import { sql, UniqueIntegrityConstraintViolationError } from "slonik";
import { pool } from "../pool";
import { randomString } from "@/helpers/randomString";
import { urlconfig } from "@/configs/urlconfig";

class ShortUrlDbService {
    public async create(url: string): Promise<ShortUrlDbId> {
        const { idLength, idCharset } = urlconfig;

        const retryCount = 3;
        for (let i = 0; i < retryCount; i++) {
            const id = randomString(idLength, idCharset);

            // Note: this generated `id` is not guaranteed to be unique. There is small chance of collision.
            // In case of collision INSERT will fail due to PK constraint, and we will retry.

            const query = sql`
                INSERT INTO ${tableShortUrl} ("id", "url") VALUES (${id}, ${url});
            `;

            try {
                await pool.query(query);
            } catch (e) {
                if (e instanceof UniqueIntegrityConstraintViolationError) {
                    // This error means id collision; retry...
                    continue;
                }

                throw e;
            }

            return id;
        }

        throw new Error("Even with multiple retries id collission couldn't be avoided. Aborting.");
    }

    public async resolve(id: ShortUrlDbId) {
        const query = sql`
            SELECT "url" FROM ${tableShortUrl} WHERE "id" = ${id};
        `;

        const result = ((await pool.maybeOneFirst(query)) || undefined) as string | undefined;
        return result;
    }
}

export const shortUrlDbService = new ShortUrlDbService();
