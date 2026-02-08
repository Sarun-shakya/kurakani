import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

dotenv.config();
const app = express();

// fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Deployment: serve React frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    // Catch-all route using regex
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
    });

    console.log("Serving frontend from dist in production mode");
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
