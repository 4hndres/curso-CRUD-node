const { Router } = require("express");
const { GetUsers, PutUsers, PostUsers, DeleteUsers, PatchUsers } = require("../controllers/users-controller");
const router = Router();

router.get("/", GetUsers);

router.put("/:userId", PutUsers);

router.post("/", PostUsers);

router.delete("/", DeleteUsers);

router.patch("/", PatchUsers);

module.exports = router;
