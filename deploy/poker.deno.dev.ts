let count = 0

const URL_BASE = "https://poker.hyprtxt.dev"

async function handleRequest(request: any) {
  const { pathname } = new URL(request.url)
  console.log(`Received request #${++count} to ${pathname}`)
  if (pathname.startsWith("/")) {
    const diced = pathname.split("/")
    const stuff = diced.slice(1, diced.length).join("/")
    return stuff ? await serveThing(stuff) : await serveThing("/index.html")
  }
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
