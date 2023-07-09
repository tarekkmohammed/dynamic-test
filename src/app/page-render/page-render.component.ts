import { Component, OnInit ,Input} from '@angular/core';
import { PageService } from '../shared-services/page/page.service';
import { CssService } from '../shared-services/css.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-page-render',
  templateUrl: './page-render.component.html',
  styleUrls: ['./page-render.component.css']
})
export class PageRenderComponent implements OnInit {
  @Input() id:any;  //TODO: pass this attr into the getPages() function
  page:any;
  modules:any;
  displays:any;
  pageContent:any;
  pageTitle:any;
  headerImage:any;
  coverImage:any;
  sanitizedContent!: SafeHtml;
  cssClass!:any
  constructor(private pageServ: PageService,private sanitizer:DomSanitizer, private cssServ : CssService, public appcomponent:AppComponent) { }


  ngOnInit(): void {
   
    if(this.id){
    this.pageServ.getPageById(this.id).subscribe(data =>{
    if(data!=null){
    this.page=data.page
    this.pageTitle=this.page.title
    this.headerImage = this.page.header_image_url
    this.coverImage = this.page.cover_image_url
    this.modules=this.page.modules
    this.modules.forEach((module:any)=>{  // goes through the content and make it safe to render (related to modules)
      module.content = this.sanitizer.bypassSecurityTrustHtml(module.content)
      module.type = "module"  // flagging the modules 
      this.cssServ.getCss(module.class_id).subscribe(cssdata=>{
       this.cssClass=cssdata
       this.cssClass=this.cssClass.cssClasses
        module.css_class = this.cssClass
        module.class = module?.css_class?.css;
      });

    });

    this.displays = this.page.page_displays
    this.pageContent = this.modules.concat(this.displays)  // concatinate the modules and displays together
    this.pageContent.sort((a:any, b:any) => a.priority - b.priority);  // sort modules and displays by priority

  }})

  }}
  
}
