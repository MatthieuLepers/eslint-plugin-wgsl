
import { lint } from 'wgsl-linter';
import type { Rule } from 'eslint';

const validWgsl: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Validate WGSL shader files',
      recommended: false,
    },
    schema: [],
    messages: {
      diagnostic: '{{message}}',
    },
  },
  create(context) {
    return {
      Program() {
        const source = context.sourceCode.text;
        const diagnostics = lint(source);

        diagnostics.forEach((diagnostic) => {
          context.report({
            loc: {
              start: context.sourceCode.getLocFromIndex(diagnostic.start),
              end: context.sourceCode.getLocFromIndex(diagnostic.end),
            },
            messageId: 'diagnostic',
            data: {
              message: diagnostic.message,
            },
          });
        });
      },
    };
  },
};

export default validWgsl;
