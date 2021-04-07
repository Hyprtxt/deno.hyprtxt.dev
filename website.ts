// import { config } from "https://deno.land/x/dotenv/mod.ts"
// console.log(config({ safe: true }))

import Play from "./fun.js"
import App from "./app.jsx"
import favicon from "./functions/favicon.ts"

let count = 0

// const isDenoDeploy = () =>
//   Deno.env.DENO_DEPLOYMENT_ID !== "undefined" ? false : true

// if ( isDevelopment? )
// import.meta.url = http://localhost/deno.hyprtxt.dev/

async function handleRequest(request: any) {
  const { pathname } = new URL(request.url)
  console.log(`Received request #${++count} to ${pathname}`)
  if (pathname.startsWith("/favicon.ico")) {
    return await favicon()
  }

  if (pathname.startsWith("/style.css")) {
    //  Construct a new URL to style.css by using the URL
    //  of the script (mod.ts) as base (import.meta.url).
    const style = new URL(
      "client/css/style.css",
      // This should be github in production
      // A local deno server for developers?
      // For now NGINX
      // "http://localhost/deno.hyprtxt.dev/"
      import.meta.url
    )
    const response = await fetch(style.toString())
    response.headers.set("content-type", "text/css charset=utf-8")
    return response
  }
  console.log("META URL", import.meta.url)
  // if (pathname.startsWith("/js/script.js")) {
  //   const script = new URL("./client/js/script.js", import.meta.url)
  //   return fetch(script.toString())
  // }
  if (pathname.startsWith("/play")) {
    const HOW_MANY_DEFAULT = 100
    let how_many = HOW_MANY_DEFAULT
    const maybe_number = parseInt(pathname.replace("/play/", ""))
    if (maybe_number > 0 && maybe_number < 10001) {
      how_many = maybe_number
    }
    // Respond with JSON
    // if (pathname.startsWith("/json")) {
    // Use stringify function to convert javascript object to JSON string.

    const start = Date.now()
    let result = 0
    let records = []
    let i = 0
    do {
      const game = Play()
      i = i + 1
      result = result + game.score
      records.push(game)
      //   console.log(result)
    } while (i < how_many)
    const how_long = Date.now() - start
    console.log(result, how_long, how_many, how_long / how_many)

    const json = JSON.stringify({
      result,
      how_long,
      how_many,
      each: how_long / how_many,
      records,
    })

    return new Response(json, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
  }

  if (pathname.startsWith("/import")) {
    return new Response(JSON.stringify(import.meta, null, 2), {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
  }

  if (pathname.startsWith("/env")) {
    return new Response(JSON.stringify(Deno.env.toObject(), null, 2), {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
  }

  return App.render()
  // new Response("<p>Hello World</p>", {
  //   headers: {
  //     "content-type": "text/html; charset=UTF-8",
  //   },
  // })
}

addEventListener("fetch", (event: any) => {
  event.respondWith(handleRequest(event.request))
})
