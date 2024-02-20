const {articleData,commentData,topicData,userData} = require('../db/data/test-data/index')
const articleDataOrigin = require('../db/data/test-data/articles')
const commentDataOrigin = require('../db/data/test-data/comments')
const topicDataOrigin = require('../db/data/test-data/topics')
const userDataOrigin = require('../db/data/test-data/users')
const request = require("supertest");
const app = require('../app');
const db = require(`../db/connection`);
const seed = require(`../db/seeds/seed`);
const data = require('../db/data/test-data')
const endpoints = require('../endpoints.json')

beforeEach(() => seed(data));
afterAll(() => db.end());



//task1
describe('testing index.js', () => {
    describe('requred keys from index should have objects with correct data', () => {
        test('artical data ', () => {
            articleData.forEach((currObject,index) => {expect(typeof currObject).toBe('object')
            expect(articleData[index]).toEqual(articleDataOrigin[index])})
        });
        test('comment data ', () => {
            commentData.forEach((currObject,index) => {expect(typeof currObject).toBe('object')
            expect(commentData[index]).toEqual(commentDataOrigin[index])})
        });
        test('topic data ', () => {
            topicData.forEach((currObject,index) => {expect(typeof currObject).toBe('object')
            expect(topicData[index]).toEqual(topicDataOrigin[index])})
        });
        test('user data ', () => {
            userData.forEach((currObject,index) => {expect(typeof currObject).toBe('object')
            expect(userData[index]).toEqual(userDataOrigin[index])})
        });
    });
})

//task2
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

//task3
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

//task4
describe('GET api/article/:articleid', () => {
    test('GET: 200 should resturn an object', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((response) => {
            expect(typeof response).toBe('object')
        })
    });
    test('GET:200 should expected properties ', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((response) => {
            const body = response.body
            expect(body).toHaveProperty('author')
            expect(body).toHaveProperty('title')
            expect(body).toHaveProperty('article_id')
            expect(body).toHaveProperty('body')
            expect(body).toHaveProperty('topic')
            expect(body).toHaveProperty('created_at')
            expect(body).toHaveProperty('votes')
            expect(body).toHaveProperty('article_img_url')
        })
    });
    test('GET: 404 resourse that does not exist', () => {
        return request(app)
        .get('/api/articles/999')
        .expect(404)
        .then((response) => {
            const body = response.body
            expect(body.msg).toBe('not found')
        })
    });
    test('GET: 400 invalid ID', () => {
        return request(app)
        .get('/api/articles/notAnID')
        .expect(400)
        .then((response) => {
            const body = response.body
            expect(body.msg).toBe('bad request')
        })
    });
});