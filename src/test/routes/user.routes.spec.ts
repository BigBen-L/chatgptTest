import request from 'supertest';
import { expect } from 'chai';
import app from '../../app';

describe('Routes', () => {
    describe('GET /', () => {
        it('should return a 200 response', async () => {
            const res = await request(app).get('/');
            expect(res.status).to.equal(200);
        });
    });
})
