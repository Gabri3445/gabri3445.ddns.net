import { NavigateFunction } from "react-router";
import { TerminalStore } from "../stores/useTerminalStore";
import { fileSystemContent } from "../components/FileSystem/FileSystemContent";

export enum Commands {
  Help = "help",
  Clear = "clear",
  Cls = "cls",
  Login = "login",
  Ls = "ls",
}

export default class CommandParser {
  private navigate: NavigateFunction;
  private terminalStore: TerminalStore;
  constructor(navigate: NavigateFunction, terminalStore: TerminalStore) {
    this.navigate = navigate;
    this.terminalStore = terminalStore;
  }

  public parseCommand(command: string, hideCommandEcho: boolean = false): void {
    let commandOutput = "";
    switch (command.trim().toLowerCase()) {
      case Commands.Help:
        commandOutput =
          "Available commands:\nhelp - Show this help message\nclear - Clear the terminal\nlogin - Requests a username an password to log in to the connected system\nls - List files in the current directory";
        break;
      case Commands.Clear:
      case Commands.Cls:
        hideCommandEcho = true;
        this.terminalStore.setTerminalHistory("");
        break;
      case Commands.Login:
        this.navigate("/login");
        break;
      case Commands.Ls:
        if (
          this.terminalStore.directory === "@" ||
          this.terminalStore.directory === "/"
        ) {
          //needs to be :blog and :photos
          const files = fileSystemContent
            .map((file) => file.name.replace("/", ":"))
            .join("\n");
          commandOutput = files;
        }
        break;
      default:
        commandOutput = `Unknown command: ${command}\nType 'help' for a list of available commands.`;
        break;
    }
    if (!hideCommandEcho) {
      this.terminalStore.appendToTerminalHistory(
        `93.43.233.0${this.terminalStore.directory}>${command}`,
      );
    }
    this.terminalStore.appendToTerminalHistory(commandOutput);
  }
}
