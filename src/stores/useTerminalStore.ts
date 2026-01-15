import { create } from "zustand/react";
import CommandParser from "../utils/commandParser";

export interface TerminalStore {
  terminalHistory: string;
  hidePrompt: boolean;
  prompt: string;
  promptInput: string;
  directory: string;
  setTerminalHistory: (history: string) => void;
  appendToTerminalHistory: (text: string) => void;
  setPromptInput: (value: string) => void;
  setPrompt: (value: string) => void;
  setHidePrompt: (value: boolean) => void;
  setDirectory: (value: string) => void;
  commandParser?: CommandParser;
}

export const useTerminalStore = create<TerminalStore>((set, get) => ({
  terminalHistory:
    "> connect 93.43.233.0\nConnection Established ::\nConnected to gabri3445 Server@93.43.233.0\n93.43.233.0@>help",
  hidePrompt: false,
  prompt: "93.43.233.0@>",
  promptInput: "",
  directory: "@",
  setTerminalHistory: (history: string) => set({ terminalHistory: history }),
  appendToTerminalHistory: (text: string) =>
    set({ terminalHistory: get().terminalHistory + "\n" + text }),
  setPromptInput: (value: string) => set({ promptInput: value }),
  setPrompt: (value: string) => set({ prompt: value }),
  setHidePrompt: (value: boolean) => set({ hidePrompt: value }),
  setDirectory: (value: string) =>
    set({ directory: value, prompt: `93.43.233.0${value}>` }),
}));
