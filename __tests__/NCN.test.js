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
describe('1-testing index.js', () => {
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

describe('GET', () => {
//task2
describe('2-GET /api/topics',() => {
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
describe('3-GET /API', () => {
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
describe('4-GET api/article/:articleid', () => {
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

//task 5
describe('5-GET /api/articles', () => {
    test('GET: 200 should respond with an array of all article objects with expected properties', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {
            const body = response.body.articles
            if( body.length !== 0){
                body.forEach((article) => {
                    expect.objectContaining({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id: expect.any(Number),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number),
                    })
                })
            }
        })
    });
    test('GET: 200 should should be sorted by date in descending order', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {
            const body = response.body.articles
            if(body.length !== 0){
                body.forEach((article,index) => {
                    if(index !== body.length -1){
                        const currentDate = new Date(article.created_at)
                        const nextDay = new Date(body[index + 1].created_at)
                        expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDay.getTime())
                    }
                })
            }
        })
    });
});

//task 6
describe('6-GET /api/articles/:article_id/comments', () => {
    test('GET: 200 should respond with an array of comments for given article id with expected properties', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then((response) => {
            const body = response.body
            if(body.length !== 0){
                body.forEach((comments) => {
                    expect.objectContaining({
                        comment_id: expect.any(Number),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        article_id: expect.any(Number),
                    })
                })
            }
        })
    });
    test('GET: 200 comments should be ordered in decsending order', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then((response) => {
            const body = response.body
            if(body.length !== 0){
                expect(body).toBeSortedBy('created_at',{descending : true})
            }
        })
    });
    test('GET 404 resourse does not exist', () => {
        return request(app)
        .get('/api/articles/9090/comments')
        .expect(404)
        .then((response) => {
            const body = response.body
            expect(body.msg).toBe('not found')
        })
    });
    test('GET: 400 invalid ID', () => {
        return request(app)
        .get('/api/articles/notAnID/comments')
        .expect(400)
        .then((response) => {
            const body = response.body
            expect(body.msg).toBe('bad request')
        })
    });
});
})
describe('POST', () => {
    describe('7-POST /api/articles/:article_id/comments', () => {
        test('POST: 201 should add a comment for an article, and respond with comment with expected properties', () => {
            const postObj = {username:'butter_bridge', body:'i like the story backwords'}
            return request(app)
            .post('/api/articles/1/comments')
            .send(postObj)
            .expect(201)
            .then((response) => {
                expect.objectContaining({
                    comment_id: expect.any(Number),
                    body: expect.any(String),
                    article_id: 1,
                    author: expect.any(String),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                })
            })
        });
        test('POST: 201 adds comment and ignores unnecassary properties', () => {
            const postObj = {username:'butter_bridge', body:'i like the story backwords',taks:'go shopping'}
            return request(app)
            .post('/api/articles/1/comments')
            .send(postObj)
            .expect(201)
            .then((response) => {
                expect.objectContaining({
                    comment_id: expect.any(Number),
                    body: expect.any(String),
                    article_id: 1,
                    author: expect.any(String),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                })
            })
        });
        test('POST: 400 missing required fields', () => {
            const postObj = { body:'i like the story backwords'}
            return request(app)
            .post('/api/articles/1/comments')
            .send(postObj)
            .expect(400)
            .then((response) => {
                const body = response.body
                expect(body.msg).toBe('bad request')
            })
        });
        test('POST: 400 failing schema validation (for username that doesnt exist)',() => {
            const postObj = {username:'321demha',body:'i like the story backwords'}
            return request(app)
            .post('/api/articles/1/comments')
            .send(postObj)
            .expect(400)
            .then((response) => {
                const body = response.body
                expect(body.msg).toBe('bad request')
            })
        })
        test('Post: 404 resourse does not exist', () => {
            const postObj = {username:'butter_bridge', body:'i like the story backwords'}
            return request(app)
            .post('/api/articles/9090/comments')
            .send(postObj)
            .expect(404)
            .then((response) => {
                const body = response.body
                expect(body.msg).toBe('not found')
            })
        });
        test('Post: 400 invalid ID', () => {
            const postObj = {username:'butter_bridge', body:'i like the story backwords'}
            return request(app)
            .post('/api/articles/not-an-id/comments')
            .send(postObj)
            .expect(400)
            .then((response) => {
                const body = response.body
                expect(body.msg).toBe('not found')
            })
        });
    });
});

xdescribe('PATCH', () => {
    describe('PATCH /api/articles/:article_id', () => {
        test('PATCH: 200 update an article by ID and responds with updated article', () => {
            const postObj = {inc_votes: 20}
            return request(app)

        });
    });
});