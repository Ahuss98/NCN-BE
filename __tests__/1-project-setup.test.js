const {articleData,commentData,topicData,userData} = require('../db/data/test-data/index')
const articleDataOrigin = require('../db/data/test-data/articles')
const commentDataOrigin = require('../db/data/test-data/comments')
const topicDataOrigin = require('../db/data/test-data/topics')
const userDataOrigin = require('../db/data/test-data/users')

describe.only('testing index.js', () => {
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