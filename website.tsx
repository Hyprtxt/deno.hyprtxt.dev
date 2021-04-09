import {
  h,
  jsx,
  json,
  serve,
  serveStatic,
} from "https://deno.land/x/sift@0.2.0/mod.ts"

import App from "./app.jsx"
import NotFound from "./components/NotFound.jsx"
import PlayMany from "./fun.js"
// import { compile } from "https://x.nest.land/sass@0.2.0/mod.ts"

// compile("a { color: #000; }", {
//   output_style: "nested",
//   precision: 5,
//   indented_syntax: false,
//   include_paths: [],
// }).result

let count = 0

const show404 = () => jsx(<NotFound />, { status: 404 })

const getBaseURL = () => {
  const isLocalMode = () =>
    import.meta.url.split(":")[0] === "file" ? true : false
  let URL_BASE: string
  if (isLocalMode()) {
    URL_BASE = "http://localhost/deno.hyprtxt.dev/"
  } else {
    URL_BASE = import.meta.url
  }
  return URL_BASE
}

// console.log(Deno.env)

serve({
  "/": () => jsx(<App />),
  // "/meta": () => json({ meta: import.meta }),
  // "/env": () => json(Deno.env.toObject()),
  "/play/:howMany": (request, params) =>
    params && params.howMany ? json(PlayMany(params.howMany)) : show404(),
  "/blog/:slug": (request, params) =>
    params && params.slug
      ? new Response(`Hello, you visited ${params.slug}!`)
      : show404(),
  "/js/:filename+": serveStatic("public/js", {
    baseUrl: getBaseURL(),
    intervene: req => {
      req.headers.set("content-type", "text/javascript; charset=utf-8")
      return req
    },
  }),
  "/css/:filename+": serveStatic("public/css", {
    baseUrl: getBaseURL(),
    intervene: req => {
      req.headers.set("content-type", "text/css; charset=utf-8")
      return req
    },
  }),
  "/:filename+": serveStatic("public", { baseUrl: getBaseURL() }),
  404: show404,
})
