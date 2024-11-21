const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const path = './anime.json'
app.use(express.json())

//función auxiliar
//crear archivo json
const crearArchivo = () => {
    if(!fs.existsSync(path)){
        fs.writeFileSync(path, JSON.stringify([]))
    }
    const data = fs.readFileSync(path, "utf-8")
    return JSON.parse(data)
}

const nuevoRegistro = (data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
}
//**** */

//rutas
app.get("/animes", (req, res)=>{
    const animes = crearArchivo()
    res.send(animes)
});

app.post("/animes", (req, res)=>{
    const animes = crearArchivo();
    const nuevoAnime = {id: animes.length + 1 ,...req.body}
    animes.push(nuevoAnime);
    nuevoRegistro(animes)
    res.status(201).json(nuevoAnime);
});

app.put("/animes", (req, res)=>{
    res.send("Ingresando al put")
});

app.delete("/animes", (req, res)=>{
    res.send("Ingresando al delete")
});
app.listen(PORT, ()=>{
    console.log("Conectado al puerto: "+PORT)
})
// ****