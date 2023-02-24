const pb = require("../proto/calculator_pb");

exports.add = (call, callback) => {
  console.log("Add was invoked");
  const res = new pb.AddResponse().setResult(
    call.request.getFirstNumber() + call.request.getSecondNumber()
  );
  callback(null, res);
};
