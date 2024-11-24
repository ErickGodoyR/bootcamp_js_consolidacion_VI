let chai = require('chai');
let chaiHttp = require('chai-http');
let { app } = require('../index');

chai.use(chaiHttp)

describe('respuesta servidor POST',()=>{
    it('responde al codigo 200 pasandole información por body',(done)=>{
        chai.request(app)
        .post('/animes')
        .send({
            "nombre": "Akira",
            "genero": "Seinen",
            "año": "1988",
            "autor": "Katsuhiro Otomo"
        })
        .end((error, respuesta)=>{
            chai.expect(respuesta).to.have.status(200)
            done()
        })
    })
})


