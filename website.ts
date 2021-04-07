import Play from "./fun.js"

import favicon from "./functions/favicon.ts"

let count = 0

async function handleRequest(request: any) {
  const HOW_MANY_DEFAULT = 100
  const { pathname } = new URL(request.url)
  console.log(`Received request #${++count} to ${pathname}`)
  if (pathname.startsWith("/favicon.ico")) {
    return await favicon()
  }
  let how_many = HOW_MANY_DEFAULT
  const maybe_number = parseInt(pathname.replace("/", ""))
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
  // }
}

addEventListener("fetch", (event: any) => {
  event.respondWith(handleRequest(event.request))
})
