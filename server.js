const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { check, validationResult } = require("express-validator");
const { getConnection } = require("./helper");
const OPTIONS = {
    "definition": {
      "openapi": "3.0.0",
      "info": {
        "title": "Swagger Express Excercise API Reference",
        "version": "1.0.0",
        "description": "A Simple Express Swagger API",
        "termsOfService": "http://example.com/terms/",
        "contact": {
          "name": "Dedeepya Ramineni",
          "url": "https://github.com/rdedeepya8/ITIS-Quiz8",
          "email": "draminen@uncc.edu"
        }
      },
  
      "servers": [
        {
          "url": "http://137.184.115.225:3000/",
          "description": "Swagger Express API Documentation"
        }
      ]
    },
    "apis": ["./*.js"]
  }

const PORT = process.env.PORT || 3000;
const app = express();
const specs = swaggerJsDoc(OPTIONS);

app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       properties:
 *         CLASS:
 *           type: string
 *         SECTION:
 *           type: string
 *         ROLLID:
 *           type: decimal
 *         GRADE:
 *           type: string
 *         SEMISTER:
 *           type: string
 *         CLASS_ATTENDED:
 *           type: decimal
 */


/**
 * @swagger
 * /report:
 *   post:
 *     summary: Inserting Student Report Information
 *     tags: [report]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  CLASS:
 *                      type: string
 *                      example: VII
 *                  SECTION:
 *                      type: string
 *                      example: C
 *                  ROLLID:
 *                      type: decimal
 *                      example: 99
 *                  GRADE:
 *                      type: string
 *                      example: B
 *                  SEMISTER:
 *                      type: string
 *                      example: 3Rd
 *                  CLASS_ATTENDED:
 *                      type: decimal
 *                      example: 90
 *
 *     responses:
 *       200:
 *         description: Succesfully inserted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not insert
 */

app.post("/report", (req, res) => {
    let body = req.body;
    getConnection()
      .then((conn) => {
        conn
          .query("INSERT INTO studentreport (CLASS, SECTION, ROLLID, GRADE, SEMISTER, CLASS_ATTENDED) VALUES (?,?,?,?,?,?)",
          [body.CLASS, 
           body.SECTION,
           body.ROLLID,
           body.GRADE,
           body.SEMISTER,
           body.CLASS_ATTENDED
        ])
          .then((rows) => {
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /report:
 *   get:
 *     summary: Returns list of all the student reports
 *     tags: [report]
 *     responses:
 *       200:
 *         description: The list of the student reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Report'
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not get student reports
 */

app.get("/report", (req, res) => {
    getConnection()
      .then((conn) => {
        conn
          .query("SELECT * from studentreport")
          .then((rows) => {
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /report:
 *   put:
 *     summary: Updating Reports
 *     tags: [report]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  GRADE:
 *                      type: string
 *                      example: B++
 *                  SECTION:
 *                      type: string
 *                      example: D
 *                  ROLLID:
 *                      type: decimal
 *                      example: 99
 *
 *     responses:
 *       200:
 *         description: Succesfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not update
 */

app.put("/report", (req, res) => {
    let body = req.body;
    getConnection()
      .then((conn) => {
        conn
          .query("UPDATE studentreport SET GRADE = ?, SECTION = ? WHERE ROLLID = ?"
          ,[body.GRADE,
            body.SECTION,
            body.ROLLID
          ])
          .then((rows) => {
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /reports:
 *   patch:
 *     summary: Updating Report Info
 *     tags: [report]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  SEMISTER:
 *                      type: string
 *                      example: 4Th
 *                  SECTION:
 *                      type: string
 *                      example: E
 *                  ROLLID:
 *                      type: decimal
 *                      example: 99
 *
 *     responses:
 *       200:
 *         description: Succesfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not update
 */

app.patch("/reports", (req, res) => {
    let body = req.body;
    getConnection()
      .then((conn) => {
        conn
          .query("UPDATE studentreport SET SEMISTER = ?, SECTION = ? WHERE ROLLID = ?"
          ,[
              body.SEMISTER,
              body.SECTION,
              body.ROLLID
          ])
          .then((rows) => {
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });


/**
 * @swagger
 * /reports/{id}:
 *   delete:
 *     summary: Deleting a student report
 *     tags: [report]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 99
 *         required: true
 *         description: id that needs to be deleted
 *     responses:
 *       200:
 *         description: Succesfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Report not deleted
 */

app.delete("/reports/:id", (req, res) => {
    let id = req.params.id;
    getConnection()
      .then((conn) => {
        conn
          .query("DELETE FROM studentreport WHERE ROLLID = ?"
          ,id)
          .then((rows) => {
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

app.get("/company", (req, res) => {
    getConnection()
      .then((conn) => {
        conn
          .query("SELECT * from company")
          .then((rows) => {
          conn.release();
           res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
app.get("/company/:id", (req, res) => {
    var id = req.params.id;
    getConnection()
      .then((conn) => {
        conn
          .query(`SELECT * from company where COMPANY_ID = ?`, id)
          .then((rows) => {
            conn.release();
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

app.get("/daysorder", (req, res) => {
    var code = req.query.code;
    getConnection()
      .then((conn) => {
        conn
          .query(`SELECT * from daysorder where AGENT_CODE = ?`, code)
          .then((rows) => {
            conn.release();
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));