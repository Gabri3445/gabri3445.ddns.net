import { NavigateFunction } from "react-router";
import { TerminalStore } from "../stores/useTerminalStore";

export enum Commands {
  Help = "help",
  Clear = "clear",
  Cls = "cls",
  Login = "login",
}

export default class CommandParser {
  private navigate: NavigateFunction;
  private terminalStore: TerminalStore;
  constructor(navigate: NavigateFunction, terminalStore: TerminalStore) {
    this.navigate = navigate;
    this.terminalStore = terminalStore;
  }

  public parseCommand(command: string, hideCommandEcho: boolean = false): void {
    switch (command.trim().toLowerCase()) {
      case Commands.Help:
        this.terminalStore.appendToTerminalHistory(
          "Available commands:\nhelp - Show this help message\nclear - Clear the terminal\nlogin - Requests a username an password to log in to the connected system",
        );
        break;
      case Commands.Clear:
      case Commands.Cls:
        hideCommandEcho = true;
        this.terminalStore.setTerminalHistory("");
        break;
      case Commands.Login:
        this.navigate("/login");
        break;
      default:
        this.terminalStore.appendToTerminalHistory(
          `Unknown command: ${command}\nType 'help' for a list of available commands.`,
        );
        break;
    }
    if (!hideCommandEcho) {
      this.terminalStore.appendToTerminalHistory(`93.43.233.0@>${command}`);
    }
  }
}
