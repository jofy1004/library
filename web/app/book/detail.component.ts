import {Component} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {LibraryService} from '../services/LibraryService'
@Component({
  selector: 'detail-component',
  templateUrl: 'app/book/detail.html'
})
export class DetailComponent {
  public book:Object = {categoryId: {}};

  /**
   * 初始化，按照书籍id加载详细书籍信息
   * @param route 跳转到此页面的路由请求
   * @param libraryService 服务提供
   */
  constructor(private route: ActivatedRoute, private libraryService: LibraryService) {
    var that = this;
    this.route.params.forEach((param: Params) => {
      libraryService.getBookById(param).then(response => {
        that.book = response.json()[0];
      });
    });

  }

  /**
   * 借阅书籍事件定义
   * @param bookId 书籍ID
   * @param user 借阅人
   */
  public borrowBook = (bookId:string) => {
    let that = this;
    let account = sessionStorage.getItem('account');
    let accountName = sessionStorage.getItem('accountName');
    if (account && accountName) {
      this.libraryService.borrowBook(bookId, account, accountName).then(response => {
        that.book = response.json();
      });
    } else {

    }

  }
}
