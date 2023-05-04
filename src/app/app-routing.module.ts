import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageRenderComponent } from './page-render/page-render.component';
const routes: Routes = [
  { path: '', component:PageRenderComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
