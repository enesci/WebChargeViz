let express = require("express")
let router = express.Router();

let dblayer = require("../utils/dblayer");

router.post("/", async function (req, res) {
    let userJSON = req.body
    console.log(userJSON);
    let userInDB = await dblayer.checkUser(userJSON);

    let status = userInDB != null ? 200 : 404;
    res.status(status).json(userInDB);
});

module.exports = router;

