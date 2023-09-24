// var mongoose = require('mongoose');
// var path = require('path')
// mongoose.connect("mongodb://127.0.0.1:27017/test");

// const express = require('express');
// const app = express(); 

// var userRoute = require('./routes/userRoute');

// app.use('/',userRoute);

// app.set('view engine', 'ejs'); // Use EJS as the view engine, adjust if you're using a different one
// app.set('views', path.join(__dirname, 'views')); // Set the directory for views





// app.listen(3000,function(){
//     console.log("app is running at 3000");
// })



var mongoose = require('mongoose');
var path = require('path');

// Use async/await to establish the MongoDB connection
(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const express = require('express');
    const app = express();

    var userRoute = require('./routes/userRoute');

    app.use('/', userRoute);

    app.set('view engine', 'ejs'); // Use EJS as the view engine, adjust if you're using a different one
    app.set('views', path.join(__dirname, 'views')); // Set the directory for views

    app.listen(3000, function () {
      console.log("app is running at 3000");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
})();
