import { useState } from "react";
import Button from "../../Button/Button";
import { FileNode } from "../FileSystemContent";
import { useNavigate } from "react-router";
import { useTerminalStore } from "../../../stores/useTerminalStore";

function FileTree({ node, level }: { node: FileNode; level: number }) {
  const [expanded, setExpanded] = useState(false);
  const terminalStore = useTerminalStore();
  const navigate = useNavigate();

  if (node.type === "link") {
    return (
      <div className={`mx-6`}>
        <Button
          text={node.name}
          isBig={false}
          width="w-full"
          centered={false}
          sideColor="bg-[#837e84]"
          onClick={() => window.open(node.url, "_blank")}
          addBorderLast={true}
        />
      </div>
    );
  }

  if (node.type === "file") {
    //TODO open the corresponding markdown file on onclick; refer to app.tsx
    return (
      <div className={`mx-6`}>
        <Button
          text={node.name}
          isBig={false}
          width="w-full"
          centered={false}
          sideColor="bg-[#837e84]"
          onClick={() => {
            //setWindowState(WindowState.FILE_VIEW); TODO
            navigate(`/file/${node.name}`);
          }} //switch to markown renderer
          addBorderLast={true}
        />
      </div>
    );
  }

  //folder
  return (
    <div className={`mx-6`}>
      <Button
        text={node.name}
        isBig={false}
        width="w-full"
        centered={false}
        sideColor="bg-[#837e84]"
        onClick={() => {
          terminalStore.commandParser?.parseCommand(
            `cd ${node.name.replace("/", "")}`,
          );
          setExpanded(!expanded);
        }}
        addBorderLast={true}
      />
      {expanded &&
        node.children?.map((child) => (
          <FileTree key={child.name} node={child} level={level + 1} />
        ))}
    </div>
  );
}

export default FileTree;
