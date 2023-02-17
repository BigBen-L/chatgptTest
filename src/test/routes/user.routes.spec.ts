import request from 'supertest';
import { expect } from 'chai';
import app from '../../app';
import mongoose, { ConnectOptions } from 'mongoose';

describe('Routes', () => {
    let server: any;
    let port: number;
    before((done) => {
        server = app.listen(3001, () => {
            port = server.address().port;
            mongoose.connect('mongodb://localhost/testdb', { useNewUrlParser: true } as ConnectOptions, (err) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                done();
            });
        });
    });
  
    after((done) => {
      server.close(() => {
        mongoose.connection.close(done);
      });
    });

    describe('GET /', () => {
        it('should return a 200 response', async () => {
            const res = await request(app).get('/');
            expect(res.status).to.equal(200);
        });
    });
})
