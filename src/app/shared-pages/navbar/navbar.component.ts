import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {pageRoute} from 'src/app/models/Interface/pageRoute';
import {NavElementsService} from 'src/app/shared-services/Navbar/nav-elements.service';
// import { SiteIdentityComponent} from "../siteIdentity/site-identity/site-identity.component";
import {SiteIdentityService} from "../../shared-services/siteIdentity/site-identity.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() pageChange = new EventEmitter<pageRoute>();
  pageData: pageRoute = {ID: 0, url: ''};
  elements: any;
  websiteLogo: any;
  websiteName: any;
  response: any;

  constructor(private router: Router, private navBarService: NavElementsService, private SiteLogo: SiteIdentityService) {
  }

  ngOnInit(): void {
    this.navBarService.getElements().subscribe(data => {
      this.elements = data
      this.elements=this.elements.navBar
      this.elements.sort((a: any, b: any) => a.priority - b.priority);  // sort elements by priority
      this.elements.forEach((element: any) => {
        if (element.drop_down_elements.length === 0) {
          element.isDropDown = false;
        } else {
          element.isDropDown = true;
          element.drop_down_elements.sort((a: any, b: any) => a.priority - b.priority);  // sort dropdown elements
        }
      })
    })
    this.SiteLogo.getSiteIdentity().subscribe(data => {
        this.response = JSON.parse(JSON.stringify(data))
        this.websiteLogo = this.response.Site_identity.images.defaultCoverLogo
        this.websiteName = this.response.Site_identity.about.universityName
      }
    )
  }

  sendIdToParent(id: number, url: string) {
    this.pageData.ID = id
    this.pageData.url = url
    this.pageChange.emit(this.pageData);
  }

}
