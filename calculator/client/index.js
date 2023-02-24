const grpc = require("@grpc/grpc-js");

const { CalculatorClient } = require("../proto/calculator_grpc_pb");
const { AddRequest } = require("../proto/calculator_pb");

function main() {
  const creds = grpc.ChannelCredentials.createInsecure();
  const client = new CalculatorClient("localhost:50051", creds);

  const req = new AddRequest();
  req.setFirstNumber(10);
  req.setSecondNumber(3);

  client.add(req, (err, res) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Sum:${res.getResult()}`);
  });

  client.close();
}

main();
