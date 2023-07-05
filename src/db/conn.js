const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_PORT)
  .then(() => console.log('Database Connected!'))
  .catch(() => console.log('Error in Database Connection!'));