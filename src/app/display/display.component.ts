import { Component, OnInit, Input } from '@angular/core';
import { DisplayService } from '../shared-services/display.service';
import { PageTreeService } from '../shared-services/pageTree.service';
import { PageService } from '../shared-services/page/page.service';
import { Observable } from 'rxjs';

@Component({
 selector: 'app-display',
 templateUrl: './display.component.html',
 styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
 @Input() id: any;

 display: any;
 settings: any;
 childrenIds: any[] = [];
 childrenPages$: Observable<any[]>|und;

 constructor(private displayServ: DisplayService, private pageServ: PageService, private pageTreeServ: PageTreeService) {}

 ngOnInit(): void {
 console.log(this.id);
 this.displayServ.getDisplayById(this.id).subscribe(display => {
 if (display != null) {
 this.display = display;
 if (display.type === 'grid') {
 this.settings = display.grid_setting;
 } else if (display.type === 'slider') {
 this.settings = display.slider_setting;
 }
 // this.childrenIds = this.pageTreeServ.getPageChildren(display.source_page_id); // ids of children of pages

 this.pageTreeServ.getPageTreeById(display.source_page_id).subscribe(page=>{
 for (let child of page.children){
 this.childrenIds.push(child.id)
 }
 })
 console.log('ids',this.childrenIds)

 if (this.childrenIds.length > 0) {
   const childrenPages$ = new Observable(observer => {
     const childrenPages:any = [];
     this.childrenIds.forEach((childId: number) => {
       console.log('Current Child ID:', childId);
       this.pageServ.getPageById(childId).subscribe(pageData => {
         childrenPages.push(pageData);
         observer.next(childrenPages);
       });
     });
   });
   this.childrenPages$ = childrenPages$;
 } else {
 console.log('No children IDs available.');
 }
 
 console.log('children pages',this.childrenPages$)
 }
 });

 
 }
}
