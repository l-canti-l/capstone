import express, { request, response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productsRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, handler } from "./middleware/errorMiddleware.js";
import path from "path";

dotenv.config();
connectDB();

// initialize express
const app = express();

//body parser
app.use(express.json());

//mount routes
app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

//paypal
app.get("/api/config/paypal", (request, response) =>
  response.send(process.env.PAYPAL_CLIENT_ID)
);

//make upload static
const __dirname = path.resolve();
app.use("/upload", express.static(path.join(__dirname, "/upload")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (request, response) =>
    response.sendFile(
      path.resolve(__dirname, "frontend", "build", "index.html")
    )
  );
} else {
  //create route, is api running
  app.get("/", (request, response) => {
    response.send("API is running......");
  });
}

//middleware
app.use(notFound);
app.use(handler);

//use ENV declared port or use port 5000
const PORT = process.env.PORT || 5000;

//listen on a port
app.listen(
  PORT, function(){
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on the port ${PORT}`
  )}
);
