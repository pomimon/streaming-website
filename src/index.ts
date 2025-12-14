import { serve } from "bun"

import { Config } from "./server/config"
import { routes } from "./server/routes"

const server = serve({
  development: Config.server.development,
  idleTimeout: Config.server.idleTimeout,
  routes,
  fetch(request) {
    if (request.headers.get("Content-Type") == "application/json") {
      return new Response("Not Found", { status: 404 })
    }

    return Response.redirect("/")
  },
  error(error) {
    console.error(error)
    return new Response("Internal Server Error", { status: 500 })
  },
})

console.log(`🚀 Server running at ${server.url}`)
