let express = require("express");
let dblayer = require("./utils/dblayer");
let app = express();
let cors = require('cors')
let userRoute = require("./routes/users")
let susLocsRoute = require("./routes/susLocs");

const port = 8000;

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({
    extended: true
}));

app.use("/users", userRoute)
app.use("/susLocs", susLocsRoute)


app.listen(port, () => {
    console.log("Server running on port: " + port + "!")
    dblayer.main();
});
module.exports = app;