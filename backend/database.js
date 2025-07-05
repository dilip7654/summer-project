


const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://sanskar:F3pdrxRNMrWUjEuL@cluster0.r6lly.mongodb.net/Team Collab")
.then(()=>{
    console.log("Database Connected!")
})
.catch((err) => {
    console.error("Database connection error:", err.message);
  });



const profileSchema=mongoose.Schema({
  uid: String,
  email: String,
  displayName: String,
  role: String,
  profilePhoto: String,
  joinedAt: { type: Date, default: Date.now }
}
)
// module.exports = mongoose.model("Profile", profileschema);



const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  createdBy: { type: String, required: true }, // Firebase UID
  members: [{ type: String }], // Firebase UIDs
  createdAt: { type: Date, default: Date.now }
});
// module.exports = mongoose.model("Project", projectSchema);




const messageSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  senderUid: { type: String, required: true }, // Firebase UID
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});
// module.exports = mongoose.model("Message", messageSchema);




const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true }, // e.g. Firebase Storage URL
  uploadedBy: { type: String, required: true }, // Firebase UID
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  uploadedAt: { type: Date, default: Date.now }
});
// module.exports = mongoose.model("File", fileSchema);



const codeFileSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  ownerUid: { type: String, required: true }, // Firebase UID
  filename: { type: String, required: true },
  language: { type: String, required: true }, // e.g., "js", "python"
  content: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});
// module.exports = mongoose.model("CodeFile", codeFileSchema);


module.exports = {
  Profile: mongoose.model("Profile", profileSchema),
  Project: mongoose.model("Project", projectSchema),
  Message: mongoose.model("Message", messageSchema),
  File: mongoose.model("File", fileSchema),
  CodeFile: mongoose.model("CodeFile", codeFileSchema),
};