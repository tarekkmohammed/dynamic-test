import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageRenderComponent } from './page-render/page-render.component';
import{HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './shared-pages/navbar/navbar.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DisplayComponent } from './display/display.component';
import {FormsModule} from "@angular/forms";
// import {SlickCarouselModule} from "ngx-slick-carousel";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import {StyleClassModule} from "primeng/styleclass";
import {MatGridListModule} from '@angular/material/grid-list';
import { SiteIdentityComponent } from './shared-pages/siteIdentity/site-identity/site-identity.component';



@NgModule({
  declarations: [
    AppComponent,
    PageRenderComponent,
    NavbarComponent,
    DisplayComponent,
    SiteIdentityComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbCarouselModule,
    FormsModule,
    CarouselModule,
    StyleClassModule,
    MatGridListModule

    // SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
