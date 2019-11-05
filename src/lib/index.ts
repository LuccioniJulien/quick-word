import chalk from "chalk";

export function info(message: string) {
  console.log(chalk.blue("INFO: ") + message);
}

export function warning(message: string) {
  console.log(chalk.yellow("WARNING: ") + message);
}

export function error(message: string) {
  console.log(chalk.red("WARNING: ") + message);
}
