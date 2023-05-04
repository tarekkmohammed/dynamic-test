import { Component, OnInit ,Input} from '@angular/core';
import { PageService } from '../shared-services/page/page.service';
import { CssService } from '../shared-services/css.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-page-render',
  templateUrl: './page-render.component.html',
  styleUrls: ['./page-render.component.css']
})
export class PageRenderComponent implements OnInit {
  @Input() id:any;  //TODO: pass this attr into the getPages() function
  page:any;
  modules:any;
  pageTitle:any;
  headerImage:any;
  coverImage:any;
  sanitizedContent!: SafeHtml;
  constructor(private pageServ: PageService,private sanitizer:DomSanitizer, private cssServ : CssService) { }

  ngOnInit(): void {
    console.log(this.id)
    this.pageServ.getPageById(this.id).subscribe(data =>{
    if(data!=null){
    this.page=data 
    this.pageTitle=this.page.title
    this.headerImage = this.page.header_image_url
    this.coverImage = this.page.cover_image_url
    this.modules=this.page.modules
    this.modules.sort((a:any, b:any) => a.priority - b.priority);  // sort modules by priority

    this.modules.forEach((module:any)=>{  // goes through the content and make it safe to render
      module.content = this.sanitizer.bypassSecurityTrustHtml(module.content)
      this.cssServ.getCss(module.class_id).subscribe(cssdata=>{
        module.css_class = cssdata;
        module.class = module.css_class.css;
      });

    });

  }})

  }
  
}
