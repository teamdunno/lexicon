type Tokens = { [key: string]: RegExp }

/**
 * The type of a lexed token
 *
 * @field {string} name The type of the token
 * @field {string} value The value that was matched
 * @field {RegExp} matched The Regex of the token
 */
export interface Token {
    name: string;
    value: string;
    matched: RegExp
}

/**
 * The basic lexer
 */
export class Lexer {
    tokens: Tokens;
    private buffer: string;
    private input: string;
    private char: number;
    private output: Token[];

    /**
     * The constructor of a Lexer.
     *
     * @param tokens A dictionary of tokens, each with a name and regex
     */
    constructor(tokens: Tokens) {
	this.tokens = tokens;
	this.buffer = "";
	this.input = "";
	this.char = 0;
	this.output = [];
    }

    private next() {
	this.buffer += this.input[this.char];
	this.char += 1;
    }

    private clear_buffer() {
	this.buffer = "";
    }

    private check_match() {
	Object.entries(this.tokens).forEach(([name, regex]) => {
	    if (regex.test(this.buffer)) {
		if (name.includes("ignored")) {
		    this.clear_buffer()
		    return
		}

		this.output.push({
		    name,
		    value: this.buffer,
		    matched: regex,
		})

		this.clear_buffer()
	    }
	})
    }

    /**
     * The function for lexing some input string
     *
     * @param input The inputted string to lex
     * @returns The list of tokens from the lexing process
     */
    lex(input: string): Token[] {
	this.input = input;

	while (this.char < this.input.length) {
	    this.next();
	    this.check_match();
	}

	return this.output;
    }
}
