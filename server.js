const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const startedAt = Date.now();

const internships = [
  {id:1,title:"Frontend Developer Intern",company:"TechNova Solutions",location:"Hyderabad, India",domain:"Web Development",type:"Remote",duration:"3 Months",skills:["HTML","CSS","JavaScript"],description:"Build responsive interfaces and improve user experiences with modern frontend practices."},
  {id:2,title:"Python Developer Intern",company:"CodeCraft Labs",location:"Bengaluru, India",domain:"Programming",type:"Hybrid",duration:"6 Months",skills:["Python","APIs","SQL"],description:"Build Python applications and work with APIs, databases, testing, and automation."},
  {id:3,title:"Data Science Intern",company:"Insight Analytics",location:"Pune, India",domain:"Data Science",type:"Remote",duration:"4 Months",skills:["Python","Pandas","Machine Learning"],description:"Explore datasets, build analytical models, and turn data into useful business insights."},
  {id:4,title:"UI/UX Design Intern",company:"Creative Pixel Studio",location:"Chennai, India",domain:"Design",type:"On-site",duration:"3 Months",skills:["Figma","Wireframes","Prototyping"],description:"Create accessible interfaces, wireframes, prototypes, and user-centered digital experiences."},
  {id:5,title:"Java Developer Intern",company:"SoftBridge Technologies",location:"Hyderabad, India",domain:"Programming",type:"Hybrid",duration:"5 Months",skills:["Java","OOP","Spring"],description:"Develop backend services while strengthening object-oriented programming and API development skills."},
  {id:6,title:"Machine Learning Intern",company:"AI Future Labs",location:"Bengaluru, India",domain:"Artificial Intelligence",type:"Remote",duration:"6 Months",skills:["Python","ML","Data"],description:"Experiment with machine learning algorithms and contribute to intelligent application prototypes."},
  {id:7,title:"Backend Developer Intern",company:"CloudCore Systems",location:"Mumbai, India",domain:"Web Development",type:"On-site",duration:"4 Months",skills:["Node.js","REST API","Databases"],description:"Develop server-side applications and learn API design, databases, authentication, and testing."},
  {id:8,title:"Digital Marketing Intern",company:"GrowthSpark Media",location:"Delhi, India",domain:"Marketing",type:"Remote",duration:"3 Months",skills:["SEO","Content","Analytics"],description:"Assist with content, social media campaigns, search optimization, and digital analytics."}
];

const dataDir = path.join(__dirname, "data");
const applicationsFile = path.join(dataDir, "applications.json");
fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(applicationsFile)) fs.writeFileSync(applicationsFile, "[]");

function log(level, message, meta = {}) {
  console.log(JSON.stringify({ timestamp: new Date().toISOString(), level, message, ...meta }));
}

app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "internship-portal", uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000), timestamp: new Date().toISOString() });
});

app.get("/api/internships", (req, res) => {
  log("info", "Internships requested", { ip: req.ip });
  res.json(internships);
});

app.post("/api/applications", (req, res) => {
  const { internshipId, name, email } = req.body || {};
  const internship = internships.find(item => item.id === Number(internshipId));
  const validEmail = typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validName = typeof name === "string" && name.trim().length >= 2;

  if (!internship || !validName || !validEmail) {
    log("warn", "Invalid application rejected", { internshipId });
    return res.status(400).json({ message: "Please provide a valid internship, name, and email address." });
  }

  try {
    const applications = JSON.parse(fs.readFileSync(applicationsFile, "utf8"));
    applications.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      internshipId: internship.id,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString()
    });
    fs.writeFileSync(applicationsFile, JSON.stringify(applications, null, 2));
    log("info", "Application created", { internshipId: internship.id });
    res.status(201).json({ message: "Application submitted successfully." });
  } catch (error) {
    log("error", "Application storage failed", { error: error.message });
    res.status(500).json({ message: "Unable to save the application right now." });
  }
});

app.use((req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ message: "API route not found" });
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => log("info", "Server started", { port: PORT, environment: process.env.NODE_ENV || "development" }));
