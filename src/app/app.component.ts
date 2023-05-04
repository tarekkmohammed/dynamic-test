import { Component } from '@angular/core';
import * as AOS from 'aos';
import { Router } from '@angular/router';
import { pageRoute } from './models/Interface/pageRoute';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dynamic-test';
  pageID:number=1;
  pageUrl!:string
  // baseUrl
  constructor(private router: Router){
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: 'ease-in-out',
      delay: 100,
      once: true,
      mirror: true,
      anchorPlacement: 'top-bottom',
  });
  }
  handlePageRoute(pagedata:pageRoute){
   this.pageID=pagedata.ID
   this.pageUrl=pagedata.url
   

  }

  ngOnInit() {

  }
  
}
