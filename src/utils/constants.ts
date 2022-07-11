
const variablesENV = {
  PORT: +process.env.PORT,
};

const environmentsENV = {
  IS_PRODUCTION: !!process.env.IS_PRODUCTION,
  IS_DEV: !!process.env.IS_DEV,
  IS_TESTING: !!process.env.IS_TESTING,
}

const databaseENV = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: +process.env.DB_PORT,
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


