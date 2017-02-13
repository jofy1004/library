'use strict';

var router = require('koa-router')();
var _ = require('lodash');
var categoryDomain = require('../db/CategoryDomain').CategoryDomain;
var libraryDomain = require('../db/LibraryDomain').LibraryDomain;
var historyDomain = require('../db/HistoryDomain').HistoryDomain;
var accountModel = require('../db/AccountDomain').AccountModel;
var wechatAPI = require('./WechatAPI').WechatAPI;
var parse = require('co-busboy');
var fs = require('fs');
var UUID_V1 = require('uuid/v1');

router.get('/getUser', function *() {
    let user = yield wechatAPI.getUser(this.query.code);
     if (!user.errcode) {
     this.redirect("/index.html?account=" + user.UserId);
     } else {
     this.redirect("/error.html");
     }
    // this.redirect("/index.html?account=fzhou@cccis.com");
});

router.post('/getUserName', function *() {
    let user = yield accountModel.getUserByAccount(this.request.body.account);
    this.body = {'accountName': user.accountName};
});

router.get('/getCategory', function *() {
    this.body = yield categoryDomain.findAllCategory();
});

router.post('/getBooksByCategory', function *() {
    this.body = yield libraryDomain.findBooksById(this.request.body.id);
});

router.post('/getBookById', function *() {
    this.body = yield libraryDomain.findBookById(this.request.body.id);
});

router.post('/getBookLikeName', function *() {
    this.body = yield libraryDomain.findBooksByParam({title: new RegExp(this.request.body.name, "i")});
});

router.post('/borrowBook', function *() {
    this.body = yield libraryDomain.borrowBook(this.request.body.id, this.request.body.account, this.request.body.accountName);
});

router.post('/getMyBooks', function *() {
    this.body = yield libraryDomain.findBooksByParam({account: this.request.body.account})
});

router.post('/returnBook', function *() {
    yield libraryDomain.returnBook(this.request.body.bookId, this.request.body.account);
    this.body = yield libraryDomain.findBooksByParam({account: this.request.body.account})
});

router.post('/getHistory', function *() {
    let history = yield historyDomain.getHistoryByAccount(this.request.body.account);
    let year = new Date().getFullYear();
    // 往年合计
    let last = _.filter(history, data => {
        return data.borrowDate.getFullYear() < year;
    }).length;
    // 当年合计
    let current = _.filter(history, data => {
        return data.borrowDate.getFullYear() == year;
    }).length;
    // 第一本借阅书籍名称和时间
    let book = _.min(_.filter(history, data => {
        return data.borrowDate.getFullYear() == year;
    }), data => {
        return data.borrowDate;
    });
    // 借阅种类最多
    this.body = {
        last: last,
        current: current,
        firstBookTitle: book.bookId.title,
        firstBookBorrowDate: book.borrowDate,
        category: '',
        appraise: ''
    };
});

router.post("/saveOrUpdateBook", function *() {
    let result = yield libraryDomain.saveOrUpdateBook(this.request.body);
    this.body = {flag: true};
});

router.get('/getAllBooks', function *() {
    this.body = yield libraryDomain.findBooksByParam({});
});

router.post('/getBookByIdNotRef', function *() {
    this.body = yield libraryDomain.findBookByIdNotRef(this.request.body.id);
});

router.post('/removeBook', function *() {
    yield libraryDomain.removeBook(this.request.body.id);
    this.body = yield libraryDomain.findBooksByParam({});
});

router.post('/uploadFile', function *() {
    let parts = parse(this);
    let part;
    while (part = yield parts) {
        let fileName = UUID_V1() + (part.filename.split('.').length > 2 ? part.filename.substring(part.filename.lastIndexOf('.')) : '.jpg');
        let stream = fs.createWriteStream(__dirname + '/../../web/covers/' + fileName);
        part.pipe(stream);
        this.body = {path: fileName};
    }
});

module.exports = router;