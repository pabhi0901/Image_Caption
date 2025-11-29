require("dotenv").config()
const app = require("./src/app")

app.listen("3000",()=>{
    console.log("App is running at 3000 port");
})