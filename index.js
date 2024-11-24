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

app.put("/animes/:id", (req, res)=>{
    const animes = crearArchivo()
    const id = parseInt(req.params.id)
    const index = animes.findIndex((anime) => anime.id === id);
    
    if(index !== -1){
        animes[index] = {...animes[index], ...req.body};
        nuevoRegistro(animes)
        res.json(animes[index]) 
    }else{
        res.status(404).json({ mensaje: 'Anime no encontrado'})
    }
});

app.delete("/animes/:id", (req, res)=>{
    const animes = crearArchivo();
    const id = parseInt(req.params.id)
    const nuevosAnimes = animes.filter((a) => a.id !== id);

    if (animes.length !== nuevosAnimes.length) {
        nuevoRegistro(nuevosAnimes);
        res.json({ mensaje: `Anime con ID ${id} ha sido eliminado` });
    } else {
        res.status(404).json({ mensaje: 'Anime no encontrado' });
    }
});
// ****

app.listen(PORT, ()=>{
    console.log("Conectado al puerto: "+PORT)
})

module.exports = { app }