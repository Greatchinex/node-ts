import app from "./config/app";
import * as dotenv from "dotenv";

dotenv.config();

const port: String = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
