require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');

const CHAT_API_KEY = process.env.CHAT_API_KEY;

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
    const { username } = req.body;

    try {
        const r = await axios.put(
            "https://api.chatengine.io/users/",
            { username: username, secret: username },
            { headers: { "Private-key": CHAT_API_KEY } }
        )

        return res.status(r.status).json(r.data);
    } catch (e) {
        return res.status(e.response.status).json(e.response.data);
    }
});



app.listen(3001);