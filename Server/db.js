const mongoose =require('mongoose');

// const mongoURI="mongodb://localhost:27017/inotebook?directConnection=true"
const mongoURI="mongodb+srv://root:toor@cluster0.2nvhulz.mongodb.net/test"
6

const connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo Successfully");
    })
    
}
// const connectToMongo =()=>{
//     mongoose.connect(mongoURI)
//     .then(() => {
//         // listen for requests
//         app.listen(port, () => {
//         console.log('Connected to database & Listening on PORT:', 5000)
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })
    
    
// }


module.exports =connectToMongo;