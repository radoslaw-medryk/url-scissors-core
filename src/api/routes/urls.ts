import Router from "koa-router";
import { shortUrlDbService } from "@/db/services/shortUrlDbService";

const r = new Router({
    prefix: "/api/v1/urls",
});

r.post("/", async ctx => {
    const body = ctx.request.body;
    const url = body.url;
    // TODO [RM]: validate body/url

    const id = await shortUrlDbService.create(url);

    ctx.body = {
        id: id,
    };
});

r.get("/:id", async ctx => {
    const id = ctx.params.id;
    // TODO [RM]: validate id

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
