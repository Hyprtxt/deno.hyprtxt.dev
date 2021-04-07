import Deck from "https://deno.land/x/cards@2.0.0/deck.ts"
import Play from "./fun.js"

let count = 0;

function handleRequest(request) {
  const { pathname } = new URL(request.url);
  
  console.log(`Received request #${++count} to ${pathname}`);
    if (pathname.startsWith("/favicon")) {
      return new Response("", {
        headers: {
          "content-type": "image/x-icon",
        },
      });
    }
  
    // Respond with JSON
    // if (pathname.startsWith("/json")) {
      // Use stringify function to convert javascript object to JSON string.
      const json = JSON.stringify({
        message: "Hello from Deno Deploy, YEAH!",
        cards: Deck.getNewCards(),
        game: Play()
      });
  
      return new Response(json, {
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      });
    // }
  }
  
  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
  
  