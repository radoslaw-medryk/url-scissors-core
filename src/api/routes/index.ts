import Router from "koa-router";
import combineRouters from "koa-combine-routers";
import { urlsRouter } from "./urls";

const routers: Router[] = [urlsRouter];

export const combinedRouter = combineRouters(routers);
