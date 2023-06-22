import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DisplayService } from '../shared-services/display.service';
import { PageTreeService } from '../shared-services/pageTree.service';
import { PageService } from '../shared-services/page/page.service';
import { pageRoute } from '../models/Interface/pageRoute';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  
})
export class DisplayComponent implements OnInit {
  
 
  @Input() id: any;

  display: any;
  displayPage:any;
  settings: any;
  childrenIds: any[] = [];
  childrenPages: any[] = [];
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  @Output() pageChange = new EventEmitter<pageRoute>();
    pageData: pageRoute={ ID: 0, url: '' };

  constructor(private router: Router, private displayServ: DisplayService, private pageServ: PageService, private pageTreeServ: PageTreeService) {}

  async fetchData(id:number){
    const result  = await this.pageTreeServ.getPageChildren(id);
    return result
  }

  sendIdToParent(id:number,url:string) {
    this.pageData.ID=id
    this.pageData.url=url
   this.pageChange.emit(this.pageData);
 }


  async ngOnInit(): Promise<void> {

    const display = await this.displayServ.getDisplayById(this.id).toPromise();
    if (display != null) {
      this.display = display;
    if (display.type === 'grid') {
      this.settings = display.grid_setting;
    } else if (display.type === 'slider') {
      this.settings = display.slider_setting;
    }
    this.pageServ.getPageById(display.source_page_id).subscribe(page=>{
      this.displayPage = page;
    })

    this.pageTreeServ.getPageChildren(display.source_page_id).subscribe(async childrenIds => {
    this.childrenIds = childrenIds;
    console.log('ids',this.childrenIds)
   
    if (this.childrenIds.length > 0) {

      for (const childId of this.childrenIds) {
        console.log('Current Child ID:', childId);
        const pageData = await this.pageServ.getPageById(childId).toPromise();
        this.childrenPages.push(pageData);
       }
       

    } else {
    console.log('No children IDs available.');
    }
   
    console.log('children pages',this.childrenPages)
    });
    }
    
   }
 
   

   
}
