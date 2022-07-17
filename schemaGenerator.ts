// https://dev.to/urosstok/input-validation-in-express-from-typescript-1p05
import path from 'path';
import * as TJS from 'typescript-json-schema';
import fs from 'fs';

// NOTE: This file is execute only once.
// if changes are done to the typescript types/interfaces,
// you will need to re-run the application in order to this
// to create a new file with the most up-to-date body request validator

console.log('Generating schemas for validation request body');

const settings = {
  required: true, // Make fields required. Must be always true
  ref: false,
  aliasRef: false,
  topRef: false,
  titles: true,
  noExtraProps: true,
  typeOfKeyword: true,
  strictNullChecks: true,
  esModuleInterop: true,
  ignoreErrors: true,
  excludePrivate: true,
  tsNodeRegister: true,
  id: '123asdf',
  rejectDateType: false,
  uniqueNames: false,
};

const interfacesFile = path.resolve('./src/utils/interfaces/index.ts');
const compilerOptionsFile = path.resolve('./tsconfig.json');
const basePath = './src';

const program = TJS.getProgramFromFiles(
  [interfacesFile],
  compilerOptionsFile,
  basePath,
);

const schema = TJS.generateSchema(program, '*', settings);

fs.writeFileSync(
  './src/_schema.ts',
  `const schema = ${JSON.stringify(schema)};
    export default schema.definitions;`,
);
