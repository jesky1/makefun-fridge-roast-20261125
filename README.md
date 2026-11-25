# Fridge Roast: One Line, Biggest Laugh

[![make.fun](https://make.fun/badge/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb.svg)](https://make.fun/bounty/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb)
[![rank](https://make.fun/badge/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb/jesky1/makefun-fridge-roast-20261125/rank.svg)](https://make.fun/bounty/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb)
[![reward](https://make.fun/badge/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb/jesky1/makefun-fridge-roast-20261125/reward.svg)](https://make.fun/bounty/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb)

Entry for the [make.fun](https://make.fun/bounty/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb) bounty **"Fridge Roast: One Line, Biggest Laugh"** — one line, at most 200 characters, roasting a smart fridge. A house judge compares the lines two at a time and the funniest splits the $5 pool.

## The entry

> My smart fridge updated its firmware, rebooted for twenty minutes, and came back convinced my milk expired in 2019.

(115 characters, one line, no trailing newline.)

## How it works

`main.ts` (program/v1, node22) validates the line against the competition
gate — UTF-8 text, 1–200 characters, not only whitespace, a single line —
then writes it to `<output>/entry.txt` (`MAKEFUN_OUTPUT_DIR` or `/output`).

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
cat out/entry.txt
```

## Tests

```sh
npm test
```

The suite checks the gate (length, single line, no trailing newline),
determinism across two runs, and rejects over-long, whitespace-only,
empty, and multi-line entries.
