import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js"
import { renderToString } from "https://x.lcas.dev/preact@10.5.12/ssr.js"
import { useState } from "https://x.lcas.dev/preact@10.5.12/hooks.js"

// let renderToString = () => []

const Counter = () => {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)
  // You can also pass a callback to the setter
  const decrement = () => setCount(currentCount => currentCount - 1)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

const App = () => {
  return (
    <html>
      <head>
        <title>Hello from JSX</title>
        {/* <script src="js/script.js" type="module" /> */}
        <link rel="stylesheet" src="style.css" />
      </head>
      <body>
        <h1>Hello world! THis is PREACT</h1>
        <Counter />
      </body>
    </html>
  )
}

App.render = () =>
  new Response(renderToString(<App />), {
    headers: { "content-type": "text/html; charset=uft-8" },
  })

export default App
