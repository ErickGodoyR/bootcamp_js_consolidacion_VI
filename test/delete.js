let chai = require('chai');
let chaiHttp = require('chai-http');
let { app } = require('../index');

chai.use(chaiHttp)


describe('Prueba DELETE',()=>{
    it('Prueba status',(done)=>{
        chai.request(app).delete('/animes?id=4')
        .end((err, resp)=>{
            chai.expect(resp).to.have.status(200)
            done()
        })
    })
})