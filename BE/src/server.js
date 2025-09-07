require('dotenv').config();
const express = require('express'); //commonjs
const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./routes/apiRoute.js');
const connection = require('./config/database');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8888;

app.use(cors({
  origin: [
    "http://localhost:5173",               // local dev
    "https://astream-289y.onrender.com"    // FE trên Render
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//config template engine
configViewEngine(app);

//khai báo routes
app.use('/api/', apiRoutes);



(async () => {
  try {
    //using mongoose
    await connection();

    app.listen(port, () => {
      console.log(`Backend Nodejs App listening on port ${port}`)
    })
  } catch (error) {
    console.log(">>> Error connect to DB: ", error)
  }
})()
