const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://admin:Kahvionok1@hooksupport-8scen.gcp.mongodb.net/hook-support?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})