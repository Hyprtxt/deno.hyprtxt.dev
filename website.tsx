import {
  h,
  jsx,
  json,
  serve,
  validateRequest,
  serveStatic,
  // } from "https://deno.land/x/sift@0.2.0/mod.ts"
} from "./sift.ts"

import Login from "./pages/login.jsx"
import Homepage from "./pages/homepage.jsx"
import NotFound from "./components/NotFound.jsx"
import PlayMany from "./fun.js"

let count = 0

const show404 = () => jsx(<NotFound />, { status: 404 })

const getBaseURL = () => {
  const isLocalMode = () =>
    import.meta.url.split(":")[0] === "file" ? true : false
  let URL_BASE: string
  if (isLocalMode()) {
    URL_BASE = "http://localhost/deno.hyprtxt.dev/"
    // From here kick off Deno Local File Server?
    // Almost cheating cause the mime types work
  } else {
    URL_BASE = import.meta.url
  }
  return URL_BASE
}

// console.log(Deno.env)

// validateFormRequest = () => {}

// if (terms[request.method].body && terms[request.method].body!.length > 0) {
//   const requestBody = await request.json();
//   const bodyKeys = Object.keys(requestBody);
//   for (const key of terms[request.method].body!) {
//     if (!bodyKeys.includes(key)) {
//       return {
//         error: {
//           message: `field '${key}' is not available in the body`,
//           status: Status.BadRequest,
//         },
//       };
//     }
//   }

//   // We store and return the body as once the request.json() is called
//   // the user cannot call request.json() again.
//   body = requestBody;
// }

const handleLogin = async (request: Request) => {
  // const requestBody = await request.json()
  // const form = await request.formData()
  // request.text().then(text => {
  //   console.log("AVLUES")
  //   console.log(text)
  //   console.log(request.method)
  // })

  // console.log("formdata", data, Object.keys(data))
  // request.formData().then(formData => {
  //   let object: { [key: string]: any } = {}
  //   formData.forEach((value, key) => (object[key] = value))
  //   return object
  // })

  const { error, body } = await validateRequest(request, {
    GET: {},
    POST: {
      form: ["email", "password"],
    },
  })
  if (error) {
    return json({ error: error.message }, { status: error.status })
  }
  if (request.method === "POST") {
    // const { email, password, checkbox } = body
    console.log("This is a ", "POST", body)
    //  email, password, checkbox)
  }
  return jsx(<Login />)
}

// const { files } = await Deno.emit("./client.tsx", {
//   bundle: "esm",
//   compilerOptions: {
//     jsxFactory: "h",
//     target: "es2015",
//     module: "es2015",
//   },
// })

serve({
  "/": () => jsx(<Homepage />),
  "/login": handleLogin,
  // "/bundle.js": serveStatic(files["deno:///bundle.js"], {
  //   intervene: req => {
  //     req.headers.set("content-type", "text/javascript; charset=utf-8")
  //     return req
  //   },
  // }),
  // "/login": async request => {
  //   // if (request && request.body) {
  //   // const body = await request.body()
  //   console.log(request.method, body)
  //   if (request.method === "GET") {
  //     return jsx(<Login />)
  //   }
  //   if (request.method === "POST") {
  //     console.log(request, Object.keys(request))
  //     return json({ hmm: "what" })
  //   }
  //   // }
  //   return show404()
  // },
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
