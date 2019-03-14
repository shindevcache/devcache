const request = require('supertest');


const server = 'http://localhost:3000';

describe('Testing ROOT', () => {
    describe('GET homepage', () => {
        it('responds with 200 status and application/json content type', () => {
            return request(server)
                .get('/')
                .expect('Content-Type', /text\/html/)
                .expect(200);
        });
    })
});