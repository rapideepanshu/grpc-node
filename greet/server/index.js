const grpc = require("@grpc/grpc-js");
const { GreetServiceService } = require("../proto/greet_grpc_pb");
const serviceImpl = require("../server/service_impl");

const addr = "localhost:50051";

function cleanup(server) {
  console.log("Cleanup");
  if (server) {
    server.forceShutdown();
  }
}

function main() {
  const server = new grpc.Server();
  process.on("SIGINT", () => {
    console.log("Caught interrup signal");
    cleanup(server);
  });

  server.addService(GreetServiceService, serviceImpl);

  server.bindAsync(
    addr,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        return cleanup(server);
      }
      console.log("Server started at port: ", port);

      server.start();
    }
  );
}

main();
