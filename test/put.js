let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');

chai.use(chaiHttp)

describe('respuesta servidor PUT',()=>{
    it('responde al codigo 200 pasandole información por body',(done)=>{
        chai.request(app)
        .put('/animes?id=4')
        .send({
            "nombre": "Naruto",
            "genero": "Shonen",
            "año": "2002",
            "autor": "Masashi Kishimoto"
        })
        .end((error, respuesta)=>{
            chai.expect(respuesta).to.have.status(200)
            done()
        })
    })
})