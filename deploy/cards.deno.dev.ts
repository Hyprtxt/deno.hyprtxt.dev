import { json, serve } from "https://deno.land/x/sift@0.2.0/mod.ts"
import Cards from "https://deno.land/x/cards@2.0.0/deck.ts"

const show404 = () => json({ message: "404..." }, { status: 404 })

serve({
  "/": () => json({ cards: Cards.getNewCards() }),
  "/:numberCards": (request, params) => {
    const deck = Cards.getNewCards()
    if (params && params.numberCards) {
      const maybe_number = +params.numberCards
      const HOW_MANY_DEFAULT = 5
      let how_many = HOW_MANY_DEFAULT
      if (maybe_number > 0 && maybe_number < 52) {
        how_many = maybe_number
      }
      return json({ cards: deck.splice(0, how_many) })
    }
    return show404()
  },
  404: show404,
})
