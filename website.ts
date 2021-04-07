import Play from "./fun.js";

let count = 0;

function handleRequest(request: any) {
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
  const HOW_MANY = 100;
  const start = Date.now();
  let result = 0;
  let records = [];
  let i = 0;
  do {
    const game = Play();
    i = i + 1;
    result = result + game.score;
    records.push(game);
    //   console.log(result)
  } while (i < HOW_MANY);
  const how_long = Date.now() - start;
  console.log(result, how_long, HOW_MANY, how_long / HOW_MANY);

  const json = JSON.stringify({
    result,
    how_long,
    HOW_MANY,
    each: how_long / HOW_MANY,
    records,
  });

  return new Response(json, {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
  // }
}

addEventListener("fetch", (event: any) => {
  event.respondWith(handleRequest(event.request));
});
