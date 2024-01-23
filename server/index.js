const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = require('./models');

// Routers
const subRouter = require('./routes/Subscriptions');
app.use("/subscriptions", subRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001")
    });
});



