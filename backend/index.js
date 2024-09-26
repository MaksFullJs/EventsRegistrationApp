const express = require("express");
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let mysqlConnection = mysql.createConnection(require("./db_config"));

mysqlConnection.connect((err) => {
    if (err) {
        console.log('Connection is failed', err)
    }
    else {
        console.log('Connection is successful')
    }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.get("/events", (req, res) => {
    mysqlConnection.query("SELECT * FROM event", (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        } else {
            console.log('trouble')
            throw err;
        }
    });
});


app.get("/event/:id", (req, res) => {
    const eventId = req.params.id;
    console.log(eventId)

    const query = "SELECT * FROM event WHERE id = ?";

    mysqlConnection.query(query, [eventId], (err, results) => {
        if (!err) {
            console.log(results)
            res.send(results[0])
        } else {
            console.log('trouble')
            throw err;
        }
    })
    
});


app.get("/event/:id/participants", (req, res) => {

    const eventId = req.params.id;
    console.log(eventId)

    const query = "SELECT * FROM user JOIN user_event ON user.id = user_event.user_id WHERE user_event.event_id = ?"

    mysqlConnection.query(query, [eventId], (err, results) => {
        if (!err) {
            console.log(results)
            res.send(results)
        } else {
            console.log('trouble')
            throw err;
        }
    })
});


app.post("/register", (req, res) => {
    const { fullName, email, birthdate, eventId, source } = req.body;

    if (!fullName || !email || !birthdate || !eventId || !source) {
        console.log('lol');
        return res.status(400).send({ message: "All fields are required." });
    }

    // Перевірка наявності користувача
    const checkUserQuery = "SELECT id FROM user WHERE email = ?";
    mysqlConnection.query(checkUserQuery, [email], (err, userResult) => {
        if (err) {
            console.log('Error checking user:', err);
            return res.status(500).send({ message: 'Error checking user' });
        }
        let userId;
        if (userResult.length === 0) {
            // Якщо користувача немає, створюємо нового
            const insertUserQuery = "INSERT INTO user (full_name, email, birthdate) VALUES (?, ?, ?)";
            mysqlConnection.query(insertUserQuery, [fullName, email, birthdate], (err, insertResult) => {
                if (err) {
                    console.log('Error inserting user:', err);
                    return res.status(500).send({ message: 'Error inserting user' });
                }
                userId = insertResult.insertId;
                registerUserEvent(userId, eventId, source, res);
            });
        } else {
            // Якщо користувач існує, беремо його ID
            userId = userResult[0].id;
            registerUserEvent(userId, eventId, source, res);
        }
    });
});

// Функція для реєстрації користувача на подію
function registerUserEvent(userId, eventId, source, res) {
    const checkUserEventQuery = "SELECT * FROM user_event WHERE user_id = ? AND event_id = ?";
    mysqlConnection.query(checkUserEventQuery, [userId, eventId], (err, userEventResult) => {
        if (err) {
            console.log('Error checking user event:', err);
            return res.status(500).send({ message: 'Error checking user event' });
        }

        if (userEventResult.length > 0) {
            return res.status(400).send({ message: 'You have already registered for this event.' });
        } else {
            const insertUserEventQuery = "INSERT INTO user_event (user_id, event_id, source_info) VALUES (?, ?, ?)";
            mysqlConnection.query(insertUserEventQuery, [userId, eventId, source], (err, insertUserEventResult) => {
                if (err) {
                    console.log('Error registering user for event:', err);
                    return res.status(500).send({ message: 'Error registering user for event' });
                }
                return res.status(201).send({ message: 'You successfully registered for the event.' });
            });
        }
    });
}