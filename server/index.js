import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.routes.js";
import applicationRoute from "./routes/application.route.js";
import superadminRoute from "./routes/superadmin.routes.js";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173", // Development
  "https://jobhive-vedansh.netlify.app", // Production
  "https://job-hive.onrender.com", // Production
];

// Configure CORS middleware
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if the origin is in the allowedOrigins list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
  credentials: true, // Allow cookies and credentials
};

// Use CORS middleware
app.use(cors(corsOptions));

  // Fallback for setting headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


import admin from 'firebase-admin';
import serviceAccount from './utils/firebase-adminsdk.json' with { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
process.env.GOOGLE_APPLICATION_CREDENTIALS;

const PORT = process.env.PORT || 3000;


// api's
app.get("/",(req,res)=>{
    res.send("Welcome to Job Portal API");
})
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/superadmin", superadminRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at ${process.env.BASE_URL || "http://localhost:" + PORT}`);
})

// Error handling middleware
app.use(errorMiddleware);