require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")

const {TELEGRAM_TOKEN, SERVER_URL, WHATSAPP_VERIFY_TOKEN} = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`
const TELEGRAM_ENDPOINT = `/webhook/telegram`
const WHATSAPP_ENDPOINT = `/webhook/whatsapp`
const TELEGRAM_WEBHOOK_URL = SERVER_URL+TELEGRAM_ENDPOINT

const app = express()
app.use(bodyParser.json())

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${TELEGRAM_WEBHOOK_URL}`)
    console.log(res.data)
}

app.post(TELEGRAM_ENDPOINT, async (req, res) => {
    console.log(req.body)

    return res.send()
})

app.get(WHATSAPP_ENDPOINT, async (req, res) => {

    console.log(req.body)

    let mode = req.body.hub.mode
    let challenge = req.body.hub.challenge
    let token = req.body.hub.verify_token

    console.log("mode = " + mode + ", challenge = " + challenge + ", token = " + token)

    if(mode === "subscribe" && token === WHATSAPP_VERIFY_TOKEN){
        return res.status(200).send(challenge)
    } else {
        return res.status(403).send()
    }
})

app.post(WHATSAPP_ENDPOINT, async (req, res) => {
    console.log(req.body)

    return res.send()
})

app.listen(process.env.PORT || 5000, async () =>{
    console.log("🚀 app running on port", process.env.PORT || 5000)
    await init()
})