const faviconFromGithub = async () => {
  const favicon = new URL(
    "/Hyprtxt/deno.hyprtxt.dev/main/public/favicon.ico",
    "https://raw.githubusercontent.com"
  )
  const response = await fetch(favicon)
  response.headers.set("content-type", "image/x-icon")
  return response
}
export default faviconFromGithub
