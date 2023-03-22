let express = require("express")
let router = express.Router();

let dblayer = require("../utils/dblayer");

router.get("/", async function (req, res) {
    let locationsInDB = await dblayer.getAllLocations();

    let status = locationsInDB !== null ? 200 : 404;
    res.status(status).json(locationsInDB);
});

router.get("/:id", async function (req, res) {
    let locationInDB = await dblayer.getLocationByID(req.params.id);
    let status = locationInDB !== null ? 200 : 404;

    res.status(status).json(locationInDB);
});

router.put("/:id", async function (req, res) {
    let locationJSON = req.body;
    await dblayer.updateLocation(req.params.id, locationJSON);
    res.status(204).end()
});

router.post("/", async function (req, res) {
    let locationJSON = req.body;
    let savedLocation = await dblayer.saveLocation(locationJSON);
    res.status(201).json(savedLocation);
});

router.delete("/:id", async function (req, res) {
    await dblayer.deleteLocationByID(req.params.id);
    res.status(204).end()
});

module.exports = router;