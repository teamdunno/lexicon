type Tokens = { [key: string]: RegExp }

export interface Token {
    name: string;
    value: string;
    matched: RegExp
}

export class Lexer {
    tokens: Tokens;
    private buffer: string;
    private input: string;
    private char: number;
    private output: Token[];

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

    lex(input: string): Token[] {
	this.input = input;

	while (this.char < this.input.length) {
	    this.next();
	    this.check_match();
	}

	return this.output;
    }
}
