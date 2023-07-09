import { Component, OnInit ,Input } from '@angular/core';
import { SiteIdentityService } from 'src/app/shared-services/siteIdentity/site-identity.service';

@Component({
  selector: 'app-site-identity',
  templateUrl: './site-identity.component.html',
  styleUrls: ['./site-identity.component.css']
})
export class SiteIdentityComponent implements OnInit {

  contactUs:any;
  socialMedia:any;
  about:any;
  contactUsArray:any;
  socialMediaArray:any;
  Site_identity:any;
  images:any;


  constructor(private siteIdentityServ: SiteIdentityService) { }

  ngOnInit(): void {
    this.siteIdentityServ.getSiteIdentity().subscribe(data=>{
      this.Site_identity = JSON.parse(JSON.stringify(data))
      this.Site_identity = this.Site_identity.Site_identity
      console.log('site identity', this.Site_identity)
      this.contactUs = this.Site_identity.contact_us
      this.socialMedia = this.Site_identity.social_media
      this.about = this.Site_identity.about
      this.socialMediaArray = [];
      this.contactUsArray = [];
      this.images = this.Site_identity.images

      for (const key in this.socialMedia) {
        if (Object.prototype.hasOwnProperty.call(this.socialMedia, key)) {
          const value = this.socialMedia[key];
          this.socialMediaArray.push({ name: key, value });
        }
      }
      for (const key in this.contactUs) {
        if (Object.prototype.hasOwnProperty.call(this.contactUs, key)) {
          const value = this.contactUs[key];
          this.contactUsArray.push({ name: key, value });
        }
      }
      console.log('contactUSUS', this.contactUsArray)
      console.log('socialMedia', this.socialMediaArray)
    })
  }
  getLogo(){
    return this.images
  }
}
