import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js"

const App = () => {
  return (
    <html lang="en-US">
      <head>
        <title>Hello from JSX</title>
        <script src="js/script.js" type="module" />
        <link rel="stylesheet" href="css/style.css" />
      </head>
      <body>
        <h1>Hello world!</h1>
        {/* <p>Server Side Rendered React should be simple</p> */}
      </body>
    </html>
  )
}

export default App
