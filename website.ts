// import { serveFile } from "https://deno.land/std@0.92.0/http/file_server.ts"

// import { config } from "https://deno.land/x/dotenv/mod.ts"
// console.log(config({ safe: true }))

// create subprocess
const p = Deno.run({
  cmd: ["file_server", "public"],
})

// await its completion
await p.status()

import Play from "./fun.js"
import App from "./app.jsx"
// import favicon from "./functions/favicon.ts"

let count = 0

// const serveThing = async (path: string, contentType: string) => {
//   const isLocalMode = () =>
//     import.meta.url.split(":")[0] === "file" ? true : false
//   let URL_BASE: string
//   if (isLocalMode()) {
//     URL_BASE = "http://localhost/deno.hyprtxt.dev/"
//   } else {
//     URL_BASE = import.meta.url
//   }
//   const favicon = new URL(path, URL_BASE)
//   const response = await fetch(favicon.toString())
//   response.headers.set("content-type", contentType)
//   return response
// }

// const isDenoDeploy = () =>
//   Deno.env.DENO_DEPLOYMENT_ID !== "undefined" ? false : true

async function handleRequest(request: any) {
  const { pathname } = new URL(request.url)
  console.log(`Received request #${++count} to ${pathname}`)

  // if (pathname.startsWith("/favicon.ico")) {
  //   return false
  // }
  // if (pathname.startsWith("/favicon.ico")) {
  //   return await serveThing("public/favicon.ico", "image/x-icon")
  // }
  // if (pathname.startsWith("/style.css")) {
  //   return await serveThing("public/css/style.css", "text/css charset=utf-8")
  // }
  // console.log("META URL", import.meta.url)

  if (pathname.startsWith("/play")) {
    const HOW_MANY_DEFAULT = 100
    let how_many = HOW_MANY_DEFAULT
    const maybe_number = parseInt(pathname.replace("/play/", ""))
    if (maybe_number > 0 && maybe_number < 10001) {
      how_many = maybe_number
    }
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
