import { Component,ViewChild } from '@angular/core';
import * as AOS from 'aos';
import { Router } from '@angular/router';
import { pageRoute } from './models/Interface/pageRoute';
import { PageRenderComponent } from './page-render/page-render.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(PageRenderComponent) pagerender!: PageRenderComponent

  title = 'dynamic-test';
  // pageRender Deafult ! ???
  pageID:number=1;
  pageUrl!:string
  baseUrl:string = window.location.origin;
   
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
   this.pageUrl=pagedata.url
   window.history.replaceState({},'', this.baseUrl + this.pageUrl);
   this.pagerender.id=pagedata.ID
   this.pagerender.ngOnInit() 

  }

  ngOnInit() {
    // reChange the baseUrl <<
   
  }
  
}
