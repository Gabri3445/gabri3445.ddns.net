import { NavigateFunction } from "react-router";
import { TerminalStore } from "../stores/useTerminalStore";
import { fileSystemContent } from "../components/FileSystem/FileSystemContent";
import { AdminStore } from "../stores/useAdminStore";
import { AdminState } from "../App.models";

export enum Commands {
  Help = "help",
  Clear = "clear",
  Cls = "cls",
  Login = "login",
  Ls = "ls",
  Cd = "cd",
}

export default class CommandParser {
  private navigate: NavigateFunction;
  private terminalStore: TerminalStore;
  private adminStore: AdminStore;
  constructor(
    navigate: NavigateFunction,
    terminalStore: TerminalStore,
    adminStore: AdminStore,
  ) {
    this.navigate = navigate;
    this.terminalStore = terminalStore;
    this.adminStore = adminStore;
  }

  public parseCommand(command: string, hideCommandEcho: boolean = false): void {
    let commandOutput = "";
    switch (command.trim().toLowerCase().split(" ")[0]) {
      case Commands.Help:
        commandOutput = `Available commands:
          help - Show this help message
          clear - Clear the terminal
          login - Requests a username an password to log in to the connected system
          ls - List files in the current directory`;
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
        if (this.adminStore.adminState !== AdminState.ADMIN) {
          this.adminStore.setAdminState(AdminState.ERR);
          commandOutput = "Insufficient Priviliges to Perform Operation.";
          break;
        }
        //TODO: handle nested ls: like `/photos/2025`
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
      case Commands.Cd: {
        if (this.adminStore.adminState !== AdminState.ADMIN) {
          this.adminStore.setAdminState(AdminState.ERR);
          commandOutput = "Insufficient Priviliges to Perform Operation.";
          break;
        }
        //TODO: handle nested cd: like `cd /photos/2025`
        if (command.split(" ").length !== 2) {
          commandOutput = "Error: too few or too many arguments.";
          break;
        }
        const directory = command.split(" ")[1];
        if (directory === "/") {
          this.terminalStore.setDirectory("/");
          break;
        }
        if (
          this.checkDirectoryExists(directory, this.terminalStore.directory)
        ) {
          if (this.terminalStore.directory === "@") {
            this.terminalStore.setDirectory(`/${directory}`);
          }
        } else {
          commandOutput = `Error: Directory '${directory}' does not exist.`;
        }
        break;
      }
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

  private checkDirectoryExists(path: string, directory: string): boolean {
    if (directory === "@" || directory === "/") {
      return fileSystemContent.some((file) => file.name === "/" + path);
    }
    return false;
  }
}
