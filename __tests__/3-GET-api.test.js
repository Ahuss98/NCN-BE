const request = require("supertest");
const app = require('../app');
const db = require(`../db/connection`);
const seed = require(`../db/seeds/seed`);
const data = require('../db/data/test-data')
const endpoints = require('../endpoints.json')


beforeEach(() => seed(data));
afterAll(() => db.end());

describe('GET /API', () => {
    test('GET: 200 should return a object of all endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            const body = response.text
            expect(typeof response).toBe('object')
            expect(JSON.parse(body)).toEqual(endpoints)
        })
    });
})