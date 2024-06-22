const router = require("express").Router();
const ctrl = require("../controller");

router.post("/", ctrl.newStory);

router.get("/", ctrl.allStories);

router.get("/:id", ctrl.getStory);

router.get("/epic/:epic", ctrl.getEpic);

router.delete("/:id", ctrl.dltStory);

router.put("/put/:id");

router.post("/:storyId/acc", ctrl.postAcceptance);

router.post("/:storyId/task", ctrl.postTask);

router.delete("/:storyId/acc/:acceptanceId", ctrl.deleteAcceptance);

router.delete("/:storyId/task/:taskId", ctrl.deleteTask);

router.patch("/:storyId/acc/:acceptanceId", ctrl.updateAcceptanceDone);

router.patch("/:storyId/task/:taskId", ctrl.updateTaskStatus);

module.exports = router;
