import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tung76721119",
  database: "mydb",
});

// Kết nối đến cơ sở dữ liệu
db.connect((error) => {
  if (error) {
    console.error("Lỗi kết nối:", error);
  } else {
    console.log("Kết nối thành công!");
    // Các tác vụ cơ sở dữ liệu khác có thể được thực hiện ở đây
  }
});

// Định nghĩa các route
app.get("/get-data", async (req, res) => {
  try {
    const sql = "SELECT * FROM currentlist";
    const results = await new Promise((resolve, reject) => {
      db.query(sql, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    console.log(results);
    res.send(results);
  } catch (error) {
    console.error("Lỗi truy vấn:", error);
    res.status(500).send("Lỗi truy vấn");
  }
});
app.post("/add-item", async (req, res) => {
  try {
    const newItem = { text: req.body.text, state: "new" };
    const sql = "INSERT INTO currentlist SET ?";
    const results = await new Promise((resolve, reject) => {
      db.query(sql, newItem, (error, results) => {
        if (error) {
          console.error("Lỗi truy vấn:", error);
          res.status(500).send("Lỗi truy vấn");
        } else {
          const sql2 = "SELECT * FROM currentlist";
          db.query(sql2, (error2, results2) => {
            if (error2) {
              console.error("Lỗi truy vấn:", error2);
              res.status(500).send("Lỗi truy vấn");
            } else {
              res.send(results2);
            }
          });
        }
      });
    });
    console.log(results);
    res.send(results);
  } catch (error) {
    console.error("Lỗi truy vấn:", error);
    res.status(500).send("Lỗi truy vấn");
  }
});
app.post("/done-item", async (req, res) => {
  try {
    const data = ["done", req.body.id];
    const sql = "UPDATE currentlist SET state = ? WHERE id= ?";
    const results = await new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          console.error("Lỗi truy vấn:", error);
          res.status(500).send("Lỗi truy vấn");
        } else {
          const sql2 = "SELECT * FROM currentlist";

          db.query(sql2, (error2, results2) => {
            if (error2) {
              console.error("Lỗi truy vấn:", error2);
              res.status(500).send("Lỗi truy vấn");
            } else {
              res.send(results2);
            }
          });
        }
      });
    });
    console.log(results);
    res.send(results);
  } catch (error) {
    console.error("Lỗi truy vấn:", error);
    res.status(500).send("Lỗi truy vấn");
  }
});
app.post("/delete-item", async (req, res) => {
  try {
    const data = ["delete", req.body.id];
    const sql = "UPDATE currentlist SET state = ? WHERE id= ?";
    const results = await new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          console.error("Lỗi truy vấn:", error);
          res.status(500).send("Lỗi truy vấn");
        } else {
          const sql2 = "SELECT * FROM currentlist";

          db.query(sql2, (error2, results2) => {
            if (error2) {
              console.error("Lỗi truy vấn:", error2);
              res.status(500).send("Lỗi truy vấn");
            } else {
              res.send(results2);
            }
          });
        }
      });
    });
    console.log(results);
    res.send(results);
  } catch (error) {
    console.error("Lỗi truy vấn:", error);
    res.status(500).send("Lỗi truy vấn");
  }
});
app.post("/refresh-item", async (req, res) => {
  try {
    const data = ["new", req.body.id];
    const sql = "UPDATE currentlist SET state = ? WHERE id= ?";
    const results = await new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          console.error("Lỗi truy vấn:", error);
          res.status(500).send("Lỗi truy vấn");
        } else {
          const sql2 = "SELECT * FROM currentlist";

          db.query(sql2, (error2, results2) => {
            if (error2) {
              console.error("Lỗi truy vấn:", error2);
              res.status(500).send("Lỗi truy vấn");
            } else {
              res.send(results2);
            }
          });
        }
      });
    });
    console.log(results);
    res.send(results);
  } catch (error) {
    console.error("Lỗi truy vấn:", error);
    res.status(500).send("Lỗi truy vấn");
  }
});


// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
