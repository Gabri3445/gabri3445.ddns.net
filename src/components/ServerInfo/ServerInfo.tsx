function ServerInfo() {
  return (
    <div className="flex flex-row mt-2.5 md:ml-5 ml-2.5">
      <div>
        <img src="/server.png"></img>
      </div>
      <div className="block md:ml-28 ml-14">
        <div className="md:text-3xl text-xl">Connected to</div>
        <div className="md:text-3xl text-xl">
          jayyd server, version {__APP_VERSION__}
        </div>
        <div className="md:text-xl">@ 93.43.233.0</div>
      </div>
    </div>
  );
}

export default ServerInfo;
