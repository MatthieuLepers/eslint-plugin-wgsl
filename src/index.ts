
import validWgsl from './rules/valid-wgsl.js';
import validWgslTemplate from './rules/valid-wgsl-template.js';
import parser from './parser.js';

const plugin = {
  parsers: {
    wgsl: parser,
  },
  rules: {
    'valid-wgsl': validWgsl,
    'valid-wgsl-template': validWgslTemplate
  },
};

export default plugin;
