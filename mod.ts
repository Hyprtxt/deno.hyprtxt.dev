import Deck from "https://deno.land/x/cards@2.0.0/deck.ts"

function handleRequest(request) {
    const { pathname } = new URL(request.url);
  
    // // Respond with HTML
    // if (pathname.startsWith("/html")) {
    //   const html = `<html>
    //     <p><b>Message:</b> Hello from Deno Deploy.</p>
    //     </html>`;
  
    //   return new Response(html, {
    //     headers: {
    //       // The "text/html" part implies to the client that the content is HTML
    //       // and the "charset=UTF-8" part implies to the client that the content
    //       // is encoded using UTF-8.
    //       "content-type": "text/html; charset=UTF-8",
    //     },
    //   });
    // }
  
    // Respond with JSON
    // if (pathname.startsWith("/json")) {
      // Use stringify function to convert javascript object to JSON string.
      const json = JSON.stringify({
        message: "Hello from Deno Deploy, YEAH!",
        cards: Deck.getNewCards()
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
  
  