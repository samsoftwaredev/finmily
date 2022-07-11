import { environmentsENV } from "./constants";

const isDevEnvironment = () => environmentsENV.IS_DEV;
const isProductionEnvironment = () => environmentsENV.IS_PRODUCTION;
const isTestingEnvironment = () => environmentsENV.IS_TESTING;

export { isDevEnvironment, isProductionEnvironment, isTestingEnvironment };
