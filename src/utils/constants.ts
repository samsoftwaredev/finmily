const variablesENV = {
  PORT: process.env.PORT ? +process.env.PORT : 3000,
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  TESTING: 'testing',
};

const environmentsENV = {
  IS_PRODUCTION: process.env.NODE_ENV === variablesENV.PRODUCTION,
  IS_DEV: process.env.NODE_ENV === variablesENV.DEVELOPMENT,
  IS_TESTING: process.env.NODE_ENV === variablesENV.TESTING,
};

const databaseENV = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT ? +process.env.DB_PORT : 5430,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_DATABASE: process.env.DB_DATABASE,
};

const validation = {
  MAX_EMAIL_LENGTH: 254,
  MAX_URL_LENGTH: 2048,
  MAX_USER_FULL_NAME_LENGTH: 128,
  MAX_USER_NAME_LENGTH: 64,
  MAX_HOUSEHOLD_NAME_LENGTH: 100,
  MAX_STREET_ADDRESS_LENGTH: 100,
  MAX_COUNTRY_LENGTH: 90,
  MAX_CITY_LENGTH: 45,
  MAX_STATE_LENGTH: 64,
  MAX_POSTAL_CODE_LENGTH: 5,
};

export { validation, variablesENV, databaseENV, environmentsENV };
