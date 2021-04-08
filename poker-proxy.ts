let count = 0

const URL_BASE = "https://poker.hyprtxt.dev"

async function handleRequest(request: any) {
  const { pathname } = new URL(request.url)
  console.log(`Received request #${++count} to ${pathname}`)
  if (pathname.startsWith("/proxy/")) {
    const diced = pathname.split("/")
    const stuff = diced.slice(2, diced.length).join("/")
    return stuff ? serveThing(stuff) : serveThing("/index.html")
  }
  return new Response(JSON.stringify(Deno.env.toObject(), null, 2), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  })
}

const serveThing = async (path: string) => {
  const thing = new URL(path, URL_BASE)
  const response = await fetch(thing.toString())
  //   response.headers.set("content-type", contentType)
  return response
}

addEventListener("fetch", (event: any) => {
  event.respondWith(handleRequest(event.request))
})
