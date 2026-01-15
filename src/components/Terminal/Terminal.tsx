import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import CommandParser from "../../utils/commandParser";
import { useTerminalStore } from "../../stores/useTerminalStore";
import { useAdminStore } from "../../stores/useAdminStore";

function Terminal() {
  const navigate = useNavigate();
  const terminalStore = useTerminalStore();
  const adminStore = useAdminStore();
  const commandParser = new CommandParser(navigate, terminalStore, adminStore);
  useEffect(() => {
    terminalStore.commandParser = commandParser;
    terminalStore.commandParser.parseCommand("help", true);
  }, []);
  useEffect(() => {
    //adminstore won't update otherwise
    terminalStore.commandParser = commandParser;
  }, [adminStore, terminalStore]);
  const input = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="flex-1 flex flex-col justify-end overflow-y-auto mb-2 ml-0.5">
        <div className="whitespace-pre-line">
          {terminalStore.terminalHistory}
        </div>
      </div>
      <div className="flex flex-row hover: ml-0.5">
        {terminalStore.hidePrompt ? null : (
          <span className="ml-2">{terminalStore.prompt}</span>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            commandParser.parseCommand(terminalStore.promptInput);
            terminalStore.setPromptInput("");
          }}
          className="ml-2"
        >
          <input
            ref={input}
            onChange={(e) => {
              terminalStore.setPromptInput(e.target.value);
            }}
            className="w-full focus:outline-none"
            value={terminalStore.promptInput}
          />
        </form>
      </div>
    </>
  );
}

export default Terminal;
