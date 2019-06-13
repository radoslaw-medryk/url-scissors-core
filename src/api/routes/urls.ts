import Router from "koa-router";
import { shortUrlDbService } from "@/db/services/shortUrlDbService";
import { validateUrl } from "../validation/validateUrl";
import { validateId } from "../validation/validateId";
import { urlconfig } from "@/configs/urlconfig";

const r = new Router({
    prefix: "/api/v1/urls",
});

r.post("/", async ctx => {
    const { urlMaxLength } = urlconfig;
    const validatedUrl = validateUrl(ctx.request.body.url, urlMaxLength);
    if (!validatedUrl.isValid) {
        // TODO [RM]: standarize error codes/responses
        ctx.status = 400;
        ctx.body = {
            error: "Invalid url provided.",
        };
        return;
    }

    const url = validatedUrl.value;
    const id = await shortUrlDbService.create(url);

    ctx.body = {
        id: id,
    };
});

r.get("/:id", async ctx => {
    const idMaxLength = 1024;
    const validatedId = validateId(ctx.params.id, idMaxLength);
    if (!validatedId.isValid) {
        // TODO [RM]: standarize error codes/responses
        ctx.status = 400;
        ctx.body = {
            error: "Invalid id provided.",
        };
        return;
    }

    const id = validatedId.value;
    const url = await shortUrlDbService.resolve(id);

    if (!url) {
        // TODO [RM]: standarize error codes/responses
        ctx.status = 404;
        ctx.body = {
            error: "Url not found for given id.",
        };
        return;
    }

    ctx.body = {
        url: url,
    };
});

export { r as urlsRouter };
