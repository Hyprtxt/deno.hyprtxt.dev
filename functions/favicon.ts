const faviconFromGithub = async (URL_BASE: string) => {
  const favicon = new URL("public/favicon.ico", URL_BASE)
  const response = await fetch(favicon.toString())
  response.headers.set("content-type", "image/x-icon")
  return response
}
export default faviconFromGithub
