const grpc = require("@grpc/grpc-js");
const { GreetServiceClient } = require("../proto/greet_grpc_pb");
const { GreetRequest } = require("../proto/greet_pb");

function doGreet(client) {
  console.log("do greet invoked");

  const req = new GreetRequest();
  req.setFirstName("John");

  client.greet(req, (err, res) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Greet:${res.getResult()}`);
  });
}

function main() {
  const creds = grpc.ChannelCredentials.createInsecure();
  const client = new GreetServiceClient("localhost:50051", creds);

  doGreet(client);

  client.close();
}

main();
