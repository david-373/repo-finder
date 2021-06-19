import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchGuard } from './guards/search.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'search-result',
    component: SearchResultComponent,
    canActivate: [SearchGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
