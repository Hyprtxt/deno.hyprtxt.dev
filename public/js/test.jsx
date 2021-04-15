import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js"
import { useState } from "https://x.lcas.dev/preact@10.5.12/hooks.js"

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

export default Counter
