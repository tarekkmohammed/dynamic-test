import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageRenderComponent } from './page-render/page-render.component';
import{HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './shared-pages/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DisplayComponent } from './display/display.component';

@NgModule({
  declarations: [
    AppComponent,
    PageRenderComponent,
    NavbarComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
