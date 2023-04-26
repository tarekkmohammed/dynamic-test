import { Component, OnInit ,Input} from '@angular/core';
import { PageService } from '../shared-services/page/page.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-page-render',
  templateUrl: './page-render.component.html',
  styleUrls: ['./page-render.component.css']
})
export class PageRenderComponent implements OnInit {
  @Input() id:any;
  page:any;
  modules:any;
  title:any;
  subtitle:any;
  headerImage:any;
  coverImage:any;
  sanitizedContent!: SafeHtml;
  constructor(private pageServ: PageService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.pageServ.getPages().subscribe(data =>{
    this.page=data 
    this.title = this.page.title
    this.subtitle = this.page.subtitle
    this.headerImage = this.page.header_image
    this.coverImage = this.page.cover_image
    this.modules=this.page.modules
    this.modules.forEach((module:any)=>{  // goes through the content and make it safe to render
      module.content = this.sanitizer.bypassSecurityTrustHtml(module.content)
    });

    })

  }
  
}
