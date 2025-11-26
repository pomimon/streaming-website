import { serve } from "bun";
import "reflect-metadata";
import index from "./index.html";

import { AppDataSource } from "./server/data-source";
import { CATEGORIES } from "./server/categories";
import { Stream } from "./server/Stream";
import { StreamInfo } from "./server/StreamInfo";

const streamRepository = AppDataSource.getRepository(Stream);

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/categories": {
      async GET(req) {
        return Response.json(CATEGORIES);
      },
    },

    "/api/streams/:category": async (req) => {
      const query = streamRepository
        .createQueryBuilder("stream")
        .where("stream.valid == 1")
        .offset(90)
        .limit(10)
        .leftJoinAndSelect("stream.snapshot", "info")
        // .where("info.live_broadcast_content == 'live'")
        .orderBy("info.published_at", "DESC")
        .getMany();

      const streams = (await query).map((stream) => {
        return {
          id: stream.resource,
          info: stream.snapshot || {},
        };
      });

      return Response.json(streams);
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
