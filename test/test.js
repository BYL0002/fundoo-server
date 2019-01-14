var chai = require('chai')
chaiHttp = require('chai-http');

const app = require('../server');

chai.use(chaiHttp);



describe("login", () => {
    it("login user", () => {

        chai.request(app)
            .post('/login')
            .type('form')
            .send({
                '_method': 'put',
                'password': '123',
                'confirmPassword': '123'
            })
    })
})