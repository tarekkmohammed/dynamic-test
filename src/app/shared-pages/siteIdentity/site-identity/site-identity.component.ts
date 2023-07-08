import { Component, OnInit ,Input } from '@angular/core';
import { SiteIdentityService } from 'src/app/shared-services/siteIdentity/site-identity.service';

@Component({
  selector: 'app-site-identity',
  templateUrl: './site-identity.component.html',
  styleUrls: ['./site-identity.component.css']
})
export class SiteIdentityComponent implements OnInit {
  @Input() id:any;
  contactUs:any;
  socialMedia:any;
  about:any;
  contactUsArray:any;
  socialMediaArray:any;


  constructor(private siteIdentityServ: SiteIdentityService) { }

  ngOnInit(): void {
    this.siteIdentityServ.getSiteIdentityById(this.id).subscribe(data=>{
      this.contactUs = data.contact_us
      this.socialMedia = data.social_media
      this.about = data.about
      this.socialMediaArray = [];
      this.contactUsArray = [];

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
      console.log('socialMedia', this.socialMedia)
    })


  }

}
