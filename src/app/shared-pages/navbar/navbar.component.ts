import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { pageRoute } from 'src/app/models/Interface/pageRoute';
  @Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() pageChange = new EventEmitter<pageRoute>();
  pageData: pageRoute={ ID: 0, url: '' };
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  sendIdToParent(id:number,url:string) {
     this.pageData.ID=id
     this.pageData.url=url
    this.pageChange.emit(this.pageData);
  }

}
