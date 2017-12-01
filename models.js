var mongoose = require('mongoose');
var mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/plumbers";

mongoose.connect(mongoURL, {
  useMongoClient: true,
});
exports.plumbersInfo = mongoose.model('plumbersInfo', {
  name: String,
  email: String,
  cell_no: Number,
  shift: Object,
  day: Object
});
