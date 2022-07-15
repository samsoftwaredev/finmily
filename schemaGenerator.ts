// https://dev.to/urosstok/input-validation-in-express-from-typescript-1p05
import path from 'path';
import * as TJS from 'typescript-json-schema';
import fs from 'fs';

// NOTE: this file is one execute once.
// if changes are done to the typescript types,
// you will need to re-run the application

console.log('Generating schemas for validation request body');

const settings = {
  required: true,
  ref: false,
};

const interfacesFile = path.resolve('./src/utils/interfaces/index.ts');
const compilerOptionsFile = path.resolve('./tsconfig.json');

const program = TJS.getProgramFromFiles(
  [interfacesFile],
  compilerOptionsFile,
  './src',
);

const schema = TJS.generateSchema(program, '*', settings);

fs.writeFileSync(
  './src/_schema.ts',
  'const schema = ' +
    JSON.stringify(schema) +
    ' as const;\nexport default schema.definitions;',
);
