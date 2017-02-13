import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LibraryService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getAllCategory() {
    return this.http.get('/getCategory').toPromise();
  }

  getAllBooks() {
    return this.http.get('/getAllBooks').toPromise();
  }

  getBookById(book:Object) {
    return this.http.post('/getBookByIdNotRef', JSON.stringify(book), {headers: this.headers}).toPromise();
  }

  saveOrUpdateBook(book:Object) {
    return this.http.post('/saveOrUpdateBook', JSON.stringify(book), {headers: this.headers}).toPromise();
  }

  getBookLikeName(value:string){
    return this.http.post('/getBookLikeName', JSON.stringify({name: value}), {headers: this.headers}).toPromise()
  }

  removeBook(value:string){
    return this.http.post('/removeBook', JSON.stringify({id: value}), {headers: this.headers}).toPromise()
  }
}
