const request = require("supertest");
const app = require('../app');
const { topicData } = require("../db/data/test-data");
const db = require(`../db/connection`);
const seed = require(`../db/seeds/seed`);
const data = require('../db/data/test-data')


beforeEach(() => seed(data));
afterAll(() => db.end());

//2-GET-api-topics
describe('GET /api/topics',() => {
    test('GET:200 availble on endpoint /api/topics', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response) =>  {
            const body = response.body
            if(body.length !== 0){
                body.forEach((dataObj,index) => {
                    expect(dataObj).toEqual(topicData[index])
                })
            }
        })
    });
    test('Get: 404, responds with not found if route does not exist', () => {
        return request(app)
        .get('/api/not-a-route')
        .expect(404)
        .then((response) => {
            const body = response.body
            expect(body.msg).toBe('route does not exist');
        })
    });
})