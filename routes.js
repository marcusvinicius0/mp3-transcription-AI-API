import { Router } from "express";
import multer from "multer";
import { MockUsersController } from "./controllers/MockUsersController.js";
import { speechToText } from "./speech-to-text.js";
import path from "path";

const routes = new Router();

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage, dest: "uploads/" });

routes.get("/", async (req, res, next) => {
  const healthCheck = {
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: "OK",
    timestamp: Date.now(),
  };

  try {
    res.send(healthCheck);
  } catch (err) {
    healthCheck.message = err;
    return res.status(503).send();
  }
});

routes.post("/get-mp3-file", upload.single("audio"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("Nenhum arquivo foi enviado.");
  }

  try {
    console.log("Arquivo recebido:", req.file.path);
    const filePath = req.file.path;
    const result = await speechToText(filePath);

    // Após a transcrição, remova o arquivo temporário
    // fs.unlinkSync(filePath);

    res.status(200).json({ message: "Arquivo transcrevido", data: result });
  } catch (error) {
    console.error("Erro na transcrição:", error);
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      message: "Erro ao transcrever arquivo",
      error: error.toString(),
    });
  }
});

routes.get("/users", new MockUsersController().index);

export default routes;
