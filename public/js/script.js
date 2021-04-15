import { h, Component, render } from "https://cdn.skypack.dev/preact"
import { useState } from "https://cdn.skypack.dev/preact/hooks"
import htm from "https://unpkg.com/htm?module"

// Initialize htm with Preact
const html = htm.bind(h)

const App = ({ name, children }) => {
  return html`<h1>HI THERE ${name}!</h1>
    ${children}`
}

const Counter = () => {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)
  // You can also pass a callback to the setter
  const decrement = () => setCount(currentCount => currentCount - 1)

  return html`
    <div>
      <p>Count: ${count}</p>
      <button onClick=${increment}>Increment</button>
      <button onClick=${decrement}>Decrement</button>
    </div>
  `
}

render(
  html`<${App} name="Person"><${Counter} /><${Counter} /><${Counter} /><//>`,
  document.body
)
