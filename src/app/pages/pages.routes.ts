import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';

const pageRoutes: Routes = [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'search/:pokemon',
        component: SearchComponent,
      },
      { path: '**', pathMatch: 'full', redirectTo: '/home' }
];


export const PAGE_ROUTES = RouterModule.forChild(pageRoutes);
