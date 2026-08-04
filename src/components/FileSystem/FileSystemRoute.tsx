import { useNavigate } from "react-router";
import Button from "../Button/Button";
import FileSystem from "./FileSystem";

function FileSystemRoute() {
  const navigate = useNavigate();
  return (
    <div className="grow flex flex-col overflow-hidden">
      <div className="w-full flex flex-row justify-between shrink-0">
        <div className="text-3xl mt-2 ml-1">jayyd PC File System</div>
        <div className="mt-2 mr-2">
          <Button
            text="&lt;-" //TODO: center the dash char
            isBig={false}
            height="h-6"
            width="w-6"
            onClick={() => navigate("/")}
            centered={true}
          ></Button>
        </div>
      </div>
      <FileSystem />
    </div>
  );
}
export default FileSystemRoute;
