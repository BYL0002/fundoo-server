var chai = require('chai')
chaiHttp = require('chai-http');

const app = require('../server.js');

chai.use(chaiHttp);

describe("login", () => {

    it("login user /login", (callback) => {

        chai.request(app)
            .post('/login')
            // .type('form')
            .send({
                // '_method': 'put',
                'email_id':'yash.sharma0002@gmail.com',
                'password': 'pass111',
            })
            .end( (err, res, body) => {

                if(err)
                {
                    console.log('err-----', err);                    
                    callback();
                }
                else
                {
                    console.log('res----', res);
                    callback();
                }

            })
    })
})