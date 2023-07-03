import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DisplayService } from '../shared-services/display.service';
import { PageTreeService } from '../shared-services/pageTree.service';
import { PageService } from '../shared-services/page/page.service';
import { pageRoute } from '../models/Interface/pageRoute';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { MatGridList,MatGridTile,MatGridListModule } from '@angular/material/grid-list';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],

})
export class DisplayComponent implements OnInit {
  images_: any;
  responsiveOptions: any;
  /**
   * is about the multi-card-carousel-settings
   */
  cards_carousel_settings = {
    numVisible: 2,
    numScroll: 2,
    autoplay: false,
    loop_slides:true,
    autoplaySpeed: 0,
  }

  @Input() id: any;
  marginClass = 'm-2';
  display: any;
  displayPage:any;
  settings: any;
  childrenIds: any[] = [];
  childrenPages: any[] = [];
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  @Output() pageChange = new EventEmitter<pageRoute>();
    pageData: pageRoute={ ID: 0, url: '' };

  constructor(private router: Router, private displayServ: DisplayService, private pageServ: PageService, private pageTreeServ: PageTreeService) {
    this.responsiveOptions = [{
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 3
    },{
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 2
    },{
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }];

  }

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
    // its about images of the card slider
    const display = await this.displayServ.getDisplayById(this.id).toPromise();
    if (display != null) {
      this.display = display;
    if (display.type === 'grid') {
      this.settings = display.grid_setting;
    } else if (display.type === 'slider') {
      this.settings = display.slider_setting;

      this.cards_carousel_settings.numVisible = this.settings.slides_per_row
      
      this.cards_carousel_settings.loop_slides = this.settings.loop_slides

      if(this.settings.auto_play === 1){
        this.cards_carousel_settings.autoplaySpeed = this.settings.effect_speed_ms
        console.log('speed',this.cards_carousel_settings.autoplaySpeed)
      }
      
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
