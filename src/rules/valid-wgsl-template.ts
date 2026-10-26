
import { lint } from "wgsl-linter";
import type { Rule } from "eslint";

const validWgslTemplate: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Validate WGSL tagged template literals",
      recommended: false,
    },
    schema: [],
    messages: {
      diagnostic: "{{message}}",
    },
  },

  create(context: Rule.RuleContext) {
    return {
      TaggedTemplateExpression(node) {
        // Only targeting wgsl tagged templates
        if (
          node.tag.type !== "Identifier" ||
          node.tag.name !== "wgsl"
        ) {
          return;
        }

        // Interpolations are not yet supported
        if (node.quasi.expressions.length > 0) {
          return;
        }

        const template = node.quasi.quasis[0];

        if (!template) {
          return;
        }

        const shader = template.value.raw;
        const diagnostics = lint(shader);

        const templateRange = node.quasi.range;

        if (!templateRange) {
          return;
        }

        // Content starts after openning backtick
        const templateStart = templateRange[0] + 1;

        diagnostics.forEach((diagnostic) => {
          context.report({
            loc: {
              start: context.sourceCode.getLocFromIndex(templateStart + diagnostic.start),
              end: context.sourceCode.getLocFromIndex(templateStart + diagnostic.end),
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

export default validWgslTemplate;
