const Story = require("../model");

exports.newStory = async (req, res) => {
  const story = new Story(req.body);
  try {
    const savedStory = await story.save();
    res.status(200).json(savedStory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.allStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.dltStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getEpic = async (req, res) => {
  try {
    const stories = await Story.find({ epic: req.params.epic });
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.putStory = async (req, res) => {
  try {
    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedStory);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.postAcceptance = async (req, res) => {
  const { storyId } = req.params;
  const { acceptance } = req.body;

  try {
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    story.acceptances.push({ acceptance, done: false });
    await story.save();
    res
      .status(201)
      .json({ message: "Acceptance added successfully", acceptance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.postTask = async (req, res) => {
  const { storyId } = req.params;
  const { task } = req.body;

  try {
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    story.tasks.push({ task, statue: "hold" });
    await story.save();
    res.status(201).json({ message: "Task added successfully", task });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteAcceptance = async (req, res) => {
  const { storyId, acceptanceId } = req.params;

  try {
    const story = await Story.findOneAndUpdate(
      { _id: storyId },
      { $pull: { acceptances: { _id: acceptanceId } } },
      { new: true } // To return the updated document
    );

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json({ message: "Acceptance deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteTask = async (req, res) => {
  const { storyId, taskId } = req.params;

  try {
    const story = await Story.findOneAndUpdate(
      { _id: storyId },
      { $pull: { acceptances: { _id: taskId } } },
      { new: true }
    );

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { storyId, taskId } = req.params;
  const { statue } = req.body;

  try {
    const story = await Story.findOneAndUpdate(
      { _id: storyId, "tasks._id": taskId },
      { $set: { "tasks.$.statue": statue } },
      { new: true }
    );

    if (!story) {
      return res.status(404).json({ message: "Story or Task not found" });
    }

    res.json({ message: "Task status updated successfully", story });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateAcceptanceDone = async (req, res) => {
  const { storyId, acceptanceId } = req.params;

  try {
    const story = await Story.findOneAndUpdate(
      { _id: storyId, "acceptances._id": acceptanceId },
      { $set: { "acceptances.$.done": true } },
      { new: true }
    );

    if (!story) {
      return res.status(404).json({ message: "Story or Acceptance not found" });
    }

    res.json({ message: "Acceptance updated to done successfully", story });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
