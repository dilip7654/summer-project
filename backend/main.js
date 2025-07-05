const express = require("express");
const cors = require("cors");
const { Profile, Project, Message, File, CodeFile } = require("./database");
const verifyToken = require("./firebaseAuth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Team Collab API Running");
});





// ----------------------------
//  PROFILE ROUTES
// ----------------------------
app.post("/api/profile", verifyToken, async (req, res) => {
  try {
    const { displayName, profilePhoto, role } = req.body;
    const uid = req.user.uid;
    const email = req.user.email;

    const profile = await Profile.findOneAndUpdate(
      { uid },
      { uid, email, displayName, profilePhoto, role },
      { upsert: true, new: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Failed to save profile", error: err.message });
  }
});

app.get("/api/profile", verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ uid: req.user.uid });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Failed to get profile", error: err.message });
  }
});






// ----------------------------
//  PROJECT ROUTES
// ----------------------------
app.post("/api/project", verifyToken, async (req, res) => {
  try {
    const { name, description } = req.body;
    const createdBy = req.user.uid;

    const project = new Project({
      name,
      description,
      createdBy,
      members: [createdBy],
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Error creating project", error: err.message });
  }
});

app.get("/api/project", verifyToken, async (req, res) => {
  try {
    const projects = await Project.find({ members: req.user.uid });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err.message });
  }
});





// ----------------------------
//  MESSAGE ROUTES
// ----------------------------
app.post("/api/message", verifyToken, async (req, res) => {
  const { content, projectId } = req.body;
  try {
    const message = new Message({
      content,
      projectId,
      senderUid: req.user.uid,
    });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: "Failed to send message", error: err.message });
  }
});

app.get("/api/message/:projectId", verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({ projectId: req.params.projectId });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to get messages", error: err.message });
  }
});







// ----------------------------
//  FILE ROUTES
// ----------------------------
app.post("/api/file", verifyToken, async (req, res) => {
  const { filename, url, projectId } = req.body;
  try {
    const file = new File({
      filename,
      url,
      uploadedBy: req.user.uid,
      projectId,
    });
    await file.save();
    res.status(201).json(file);
  } catch (err) {
    res.status(500).json({ message: "Failed to save file", error: err.message });
  }
});

app.get("/api/file/:projectId", verifyToken, async (req, res) => {
  try {
    const files = await File.find({ projectId: req.params.projectId });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: "Failed to get files", error: err.message });
  }
});






// ----------------------------
//  CODE FILE ROUTES
// ----------------------------
app.post("/api/codefile", verifyToken, async (req, res) => {
  const { filename, language, content, projectId } = req.body;
  try {
    const codeFile = new CodeFile({
      filename,
      language,
      content,
      projectId,
      ownerUid: req.user.uid,
    });
    await codeFile.save();
    res.status(201).json(codeFile);
  } catch (err) {
    res.status(500).json({ message: "Failed to save code file", error: err.message });
  }
});

app.get("/api/codefile/:projectId", verifyToken, async (req, res) => {
  try {
    const codeFiles = await CodeFile.find({ projectId: req.params.projectId });
    res.json(codeFiles);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch code files", error: err.message });
  }
});

app.put("/api/codefile/:id", verifyToken, async (req, res) => {
  try {
    const updated = await CodeFile.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content, updatedAt: new Date() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update code file", error: err.message });
  }
});






//Listen to port 5000
app.listen(PORT, () => {
  console.log(`YOUR Server is running at http://localhost:${PORT}`);
});
