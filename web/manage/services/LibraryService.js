"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var LibraryService = (function () {
    function LibraryService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    LibraryService.prototype.getAllCategory = function () {
        return this.http.get('/getCategory').toPromise();
    };
    LibraryService.prototype.getAllBooks = function () {
        return this.http.get('/getAllBooks').toPromise();
    };
    LibraryService.prototype.getBookById = function (book) {
        return this.http.post('/getBookByIdNotRef', JSON.stringify(book), { headers: this.headers }).toPromise();
    };
    LibraryService.prototype.saveOrUpdateBook = function (book) {
        return this.http.post('/saveOrUpdateBook', JSON.stringify(book), { headers: this.headers }).toPromise();
    };
    LibraryService.prototype.getBookLikeName = function (value) {
        return this.http.post('/getBookLikeName', JSON.stringify({ name: value }), { headers: this.headers }).toPromise();
    };
    LibraryService.prototype.removeBook = function (value) {
        return this.http.post('/removeBook', JSON.stringify({ id: value }), { headers: this.headers }).toPromise();
    };
    return LibraryService;
}());
LibraryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LibraryService);
exports.LibraryService = LibraryService;
//# sourceMappingURL=LibraryService.js.map