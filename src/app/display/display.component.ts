import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DisplayService } from '../shared-services/display.service';
import { PageTreeService } from '../shared-services/pageTree.service';
import { PageService } from '../shared-services/page/page.service';
import { pageRoute } from '../models/Interface/pageRoute';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { MatGridList, MatGridTile, MatGridListModule } from '@angular/material/grid-list';
import { Display } from '../models/Interface/display';
import { forkJoin, map } from 'rxjs';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],

})
export class DisplayComponent implements OnInit {
   childPage:any
  images_: any;
  responsiveOptions: any;
  /**
   * is about the multi-card-carousel-settings
   */
  cards_carousel_settings = {
    numVisible: 2,
    numScroll: 2,
    autoplay: false,
    loop_slides: true,
    autoplaySpeed: 0,
  }

  @Input() id: any;
  marginClass = 'm-2';
  display: any;
  displayPage: any;
  settings: any;
  childrenIds: number[]=[]
  childrenPages: any[] = [];

  @Output() pageChange = new EventEmitter<pageRoute>();
  pageData: pageRoute = { ID: 0, url: '' };

  constructor(private router: Router, private displayServ: DisplayService, private pageServ: PageService, private pageTreeServ: PageTreeService) {
    this.responsiveOptions = [{
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 3
    }, {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 2
    }, {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }];

  }

  async fetchData(id: number) {
    const result = await this.pageTreeServ.getPageChildren(id);
    return result
  }

  sendIdToParent(id: number, url: string) {
    this.pageData.ID = id
    this.pageData.url = url
    this.pageChange.emit(this.pageData);
  }


 ngOnInit()  {
    this.displayServ.getDisplayById(this.id).subscribe(data=>{
      this.display=data.Display
      console.log('type', this.display.type)
      
      if (this.display.type === 'grid') {
        this.settings = this.display.grid_setting;
      } else if (this.display.type === 'slider') {
        this.settings = this.display.slider_setting;
  
        this.cards_carousel_settings.numVisible = this.settings.slides_per_row;
        this.cards_carousel_settings.loop_slides = this.settings.loop_slides;
  
        if (this.settings.auto_play === 1) {
          this.cards_carousel_settings.autoplaySpeed = this.settings.effect_speed_ms;
          console.log('speed', this.cards_carousel_settings.autoplaySpeed);
        }
      }
      
      this.pageServ.getPageById(this.display.source_page_id).subscribe(data=>{
     
        this.displayPage=data.page
        this.pageTreeServ.getPageChildren(this.display.source_page_id).subscribe( ids => {
          this.childrenIds = ids;
      //    console.log('ids', this.childrenIds);
        
      if (this.childrenIds.length > 0) {
        this.childrenPages = [];
        const observables = [];
        for (const childId of this.childrenIds) {
          // console.log('Current Child ID:', childId);
          const childPage$ = this.pageServ.getPageById(childId).pipe(map(res => res.page));
          observables.push(childPage$);
        }
        forkJoin(observables)?.subscribe(results => {
          this.childrenPages = results;
          // console.log(this.childrenPages);
        });
      
          } else {
            console.log('No children IDs available.');
          }
        
          console.log('children pages', this.childrenPages);
        });
      });
  
 
    });
  
  
 
  }

  handleDisplayData(display:any){

    this.pageServ.getPageById(display.source_page_id).subscribe(page => {
      this.displayPage = page.page;
    })

    this.pageTreeServ.getPageChildren(display.source_page_id).subscribe(async childrenIds => {
      this.childrenIds = childrenIds;
      console.log('ids', this.childrenIds)
    
      if (this.childrenIds.length > 0) {
        this.childrenPages = [];
        for (const childId of this.childrenIds) {
          console.log('Current Child ID:', childId);
          this.childPage = await this.pageServ.getPageById(childId).toPromise();
          this.childPage=this.childPage.page
          this.childrenPages.push(this.childPage);
          console.log('Page data loaded:', this.childPage);
        }
      } else {
        console.log('No children IDs available.');
      }
    
      console.log('children pages', this.childrenPages)
    });

    
  }
}
