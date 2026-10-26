
import type { Linter } from 'eslint';

interface WgslProgram {
  type: 'Program';
  body: [];
  sourceType: 'module';
  range: [number, number];
  loc: {
    start: { line: number; column: number };
    end: { line: number; column: number };
  };
  tokens: [];
  comments: [];
}

interface WgslParseResult {
  ast: WgslProgram;
  services: Record<string, never>;
  visitorKeys: {
    Program: string[];
  };
}

const parser: Linter.ParserModule = {
  parseForESLint(code: string): WgslParseResult {
    const lines = code.split(/\r\n|[\r\n\u2028\u2029]/);
    const lastLine = lines.length;

    const ast: WgslProgram = {
      type: 'Program',
      body: [],
      sourceType: 'module',
      range: [0, code.length],
      loc: {
        start: { line: 1, column: 0 },
        end: {
          line: lastLine,
          column: lines[lastLine - 1].length,
        },
      },
      tokens: [],
      comments: [],
    };

    return {
      ast,
      services: {},
      visitorKeys: {
        Program: ['body'],
      },
    };
  },
};

export default parser;
