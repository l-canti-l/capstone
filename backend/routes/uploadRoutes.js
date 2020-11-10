import express from "express";
import multer from "multer";
import path from "path";
import { protection, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
//set storage
const storage = multer.diskStorage({
  //set destination
  destination(request, file, cb) {
    cb(null, "upload/");
  },
  //format file name
  filename(request, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
//check file type thanks stack overflow
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|bmp/;
  const extenstionName = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if (extenstionName && mimetype) {
    return cb(null, true);
  } else {
    cb("Only images nerd");
  }
}

const upload = multer({
  storage,
  //check file type
  fileFilter: function (request, file, cb) {
    checkFileType(file, cb);
  },
});

//create routes
router.post(
  "/",
  protection,
  admin,
  upload.single("image"),
  (request, response) => {
    //send path back
    response.send(`/${request.file.path.replace('\\', '/')}`);
  }
);
export default router;
