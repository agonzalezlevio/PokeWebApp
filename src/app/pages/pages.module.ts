import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routes
import { PAGE_ROUTES } from './pages.routes';

// Components
import { HomeComponent } from './home/home.component';

// Modules
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent
  ],
  imports: [
    PAGE_ROUTES,
    CommonModule
  ],
  exports: [
    HomeComponent,
    SearchComponent
  ]
})
export class PagesModule { }