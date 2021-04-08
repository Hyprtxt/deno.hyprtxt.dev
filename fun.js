// import Deck from "./deck.js"
import Deck from "https://deno.land/x/cards@2.0.0/deck.ts"
import Poker from "./video_poker/score.js"
import Strategy from "./strategy/simple.js"

import * as Colors from "./colors.ts"

const PlayMany = maybe_number => {
  const HOW_MANY_DEFAULT = 10
  let how_many = HOW_MANY_DEFAULT
  if (maybe_number > 0 && maybe_number < 10001) {
    how_many = maybe_number
  }
  const start = Date.now()
  let result = 0
  let records = []
  let i = 0
  do {
    const game = Play()
    i = i + 1
    result = result + game.score
    records.push(game)
    //   console.log(result)
  } while (i < how_many)
  const how_long = Date.now() - start
  console.log(result, how_long, how_many, how_long / how_many)
  return {
    result,
    how_long,
    how_many,
    each: how_long / how_many,
    records,
  }
}

const Play = () => {
  const cards = Deck.getNewCards()
  const hand = cards.slice(0, 5)
  const strat = Strategy.simpleStrategy(hand)
  const integerStrat = strat.strategy.map(thing =>
    parseInt(thing.replace("HOLD_", ""))
  )
  let currentSlice = 4
  const final = hand.map((card, index) => {
    if (integerStrat.indexOf(index + 1) === -1) {
      currentSlice++
      return cards.slice(currentSlice, currentSlice + 1)[0]
    } else {
      return card
    }
  })
  const message = {
    hand,
    final,
    strat,
    score: Poker.score(final).win - 5,
  }
  // console.log(
  //   " " +
  //     hand.map((card, index) => {
  //       if (integerStrat.indexOf(index + 1) === -1) {
  //         return Colors.red(card);
  //       } else {
  //         return Colors.green(card);
  //       }
  //     }) +
  //     "\n " +
  //     Colors.green(final + "\n"),
  //   Colors.blue(strat.rule_number + " ") +
  //     "- " +
  //     Colors.cyan(strat.rule + "\n"),
  //   Poker.score(final)
  // );
  return message
}

export default PlayMany
