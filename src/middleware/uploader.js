import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Get the directory name of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));

const uploader = multer({
  dest: resolve(__dirname, "../../public/uploads"),
  limits: {
    fileSize: 3e7, // 30MB
  },
});

export default uploader;
