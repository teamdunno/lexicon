# `@dunno/lexicon` - create simple lexers easily

```ts
import { Lexer } from "jsr:@dunno/lexicon";

const math = new Lexer({
    ignored_whitespace: /\s/, // tokens with ignored_ are not shown at output
    number: /[0-9]+/,
    operation: /[+-/*]/
})

console.log(math.lex("2 + 2"));
```
