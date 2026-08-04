import Terminal from "./components/Terminal/Terminal";
import { Outlet } from "react-router";

function Layout() {
  //const [adminState, setAdminState] = useState<AdminState>(AdminState.ADMIN);
  //const [windowState, setWindowState] = useState<WindowState>(
  //  WindowState.FILE_VIEW,
  //);
  return (
    <div className="bg-kaguya bg-cover bg-center h-screen text-white md:overflow-hidden select-none flex flex-row">
      <div className="border h-[calc(100vh-2.50rem)] border-[#26b1e1] my-5 md:mr-0.5 md:ml-5 mr-2 ml-2 flex flex-col md:w-2/3 w-screen">
        <div className="w-full bg-cyan-500/75 pl-1 text-xs h-fits leading-tight text-[#7febf7]">
          DISPLAY
        </div>
        <Outlet />
      </div>
      <div className="border h-[calc(100vh-2.50rem)] border-[#26b1e1] my-5 mr-5 ml-0.5 flex-col w-1/2 hidden md:flex">
        <div className="w-full bg-cyan-500/75 pl-1 text-xs h-fits leading-tight text-[#7febf7]">
          TERMINAL
        </div>
        <Terminal></Terminal>
      </div>
    </div>
  );
}

export default Layout;
// <Button sideColor="bg-fuchsia-300" isBig={true} text="Test" />

/*
{(windowState === WindowState.LOGIN ||
          windowState === WindowState.MAIN) && (
          <div className="grow flex flex-col">
            <ServerInfo />
            {adminState === AdminState.ERR ||
            adminState === AdminState.ADMIN ? (
              <div className="mt-4 mb-8">
                <AdminStrip error={adminState === AdminState.ERR} />
              </div>
            ) : null}
            <div className=" mt-8 grow flex flex-col justify-between">
              {windowState === WindowState.LOGIN && <Login />}
              {windowState === WindowState.MAIN && (
                <div className="ml-6 mt-8">
                  <ButtonList />
                </div>
              )}
              <div className="mb-2 ml-6">
                <Button
                  sideColor="bg-[#6c1a49]"
                  isBig={false}
                  text="Disconnect"
                  onClick={() => {
                    history.back();
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {windowState === WindowState.FILE_SYSTEM && (
          <div className="grow flex flex-col overflow-hidden">
            <div className="w-full flex flex-row justify-between shrink-0">
              <div className="text-3xl mt-2 ml-1">jayyd PC File System</div>
              <div className="mt-2 mr-2">
                <Button
                  text="&lt;-" //TODO: center the dash char
                  isBig={false}
                  height="h-6"
                  width="w-6"
                  onClick={() => setWindowState(WindowState.MAIN)}
                  centered={true}
                ></Button>
              </div>
            </div>
            <FileSystem />
          </div>
        )}
        {windowState === WindowState.FILE_VIEW && (
          <div className="grow flex flex-col">
            <div className="w-full flex flex-row justify-between">
              <div className="text-3xl mt-2 ml-1">{fileNode?.name}</div>
              <div className="mt-2 mr-2">
                <Button
                  text="&lt;-" //TODO: center the dash char
                  isBig={false}
                  height="h-6"
                  width="w-6"
                  onClick={() => {
                    setWindowState(WindowState.MAIN);
                    setFileNode(null);
                  }}
                  centered={true}
                ></Button>
              </div>
            </div>{" "}
            {/*move the markdown renderer to its own component}
            <div className="mt-2 ml-1 prose prose-invert font-sans">
              <Markdown>{fileNode?.markdownContents}</Markdown>
            </div>
          </div>
        )}
**/
