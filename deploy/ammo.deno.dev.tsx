import { h, serve, jsx } from "../sift.ts"

// SIFT DONE

const digits_count = (n: number) => {
  let count = 0
  if (n >= 1) ++count
  while (n / 10 >= 1) {
    n /= 10
    ++count
  }
  return count
}

const getQueryStringParam = (url: string, param: string) => {
  const searchParams = new URLSearchParams(new URL(url).search.slice(1))
  const queryParam = searchParams.get(param)
  return queryParam ? queryParam : ""
}

const Layout = (props: any) => {
  const { children, script } = props
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossOrigin="anonymous"
        />
        <title>Hello, This is a Deno Powered Website</title>
      </head>
      <body>
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="/">
            🎯 Can we Ammo Ship your Zip?
          </a>
        </nav>
        <div class="container mt-5">{children}</div>
        {script && <script src={`js/${script}`} type="module" />}
      </body>
    </html>
  )
}

const AmmoCalc = (props: any) => {
  const { zip, result } = props
  return (
    <Layout>
      <div>
        <h1>Ammo Zip</h1>
        <script src="https://unpkg.com/xstate@4/dist/xstate.js"></script>
        <form id="form-forgot">
          <div className="mb-3">
            <p className="" id="forgot-feedback"></p>
            <label htmlFor="zipCode" className="form-label">
              Zip Code
            </label>
            <input
              name="zip"
              type="number"
              className="form-control"
              id="zipCode"
              aria-describedby="zipHelp"
              value={zip}
            />
            <div id="zipHelp" className="form-text">
              Put in a 5 digit zip code!
            </div>
            <p>{result}</p>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  )
}

const handleAmmoCalc = async (request: Request) => {
  let result = ""
  const zip = parseInt(getQueryStringParam(request.url, "zip"))
  const digits = digits_count(zip)
  if (digits === 4 || digits === 5) {
    result = `We Ship AMMO to ${zip}`
    // MA
    if (zip >= 1001 && zip <= 2791) {
      result = "MA - No Ammo Shipment Allowed"
    }
    // HI
    if (zip >= 96701 && zip <= 96898) {
      result = "HI - No Ammo Shipment Allowed"
    }
    // AK
    if (zip >= 99501 && zip <= 99950) {
      result = "AK - No Ammo Shipment Allowed"
    }
    // MAYBES
    // CT
    if (zip >= 6001 && zip <= 6389) {
      result = "CT - Maybe"
    }
    // NY
    if (zip >= 6390 && zip <= 6390) {
      result = "NY - Maybe"
    }
    // NJ
    if (zip >= 7001 && zip <= 8989) {
      result = "NJ - Maybe"
    }
    // NY
    if (zip >= 10001 && zip <= 14975) {
      result = "NY - Maybe"
    }
    // DC
    if (zip >= 20001 && zip <= 20039) {
      result = "DC - Maybe"
    }
    // DC
    if (zip >= 20042 && zip <= 20599) {
      result = "DC - Maybe"
    }
    // DC
    if (zip >= 20799 && zip <= 20799) {
      result = "DC - Maybe"
    }
    // IL
    if (zip >= 60001 && zip <= 62999) {
      result = "IL - Maybe"
    }
    // CA
    if (zip >= 90001 && zip <= 96162) {
      result = "CA - Maybe"
    }
    // Validate it is really a zip code?
    // It's Ok
  } else {
    // ADD A VALID ZIP
  }
  return jsx(<AmmoCalc zip={zip} result={result} />, { status: 404 })
}

serve({
  "/": handleAmmoCalc,
})
