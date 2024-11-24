let chai = require('chai');
let chaiHttp = require('chai-http');
let { app } = require('../index');

chai.use(chaiHttp)

describe('respuesta servidor GET',()=>{
    it('responde al codigo 200',(done)=>{
        chai.request(app).get('/animes').end((error, respuesta)=>{
            chai.expect(respuesta).to.have.status(200)
            done()
        })
    })
})
