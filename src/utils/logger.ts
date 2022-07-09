class Logger {
  constructor() {}
  error = (value: any) => {
    console.error(value);
  };
  info = (value: any) => {
    console.log(value);
  };
  warning = (value: any) => {
    console.log(value);
  };
  debugger = (value: any) => {
    console.log(value);
  };
}

const log = new Logger();
export default log;
