import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HomeComponent,
  SearchComponent,
  SearchResultComponent,
} from './components';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { FavoritDirective } from './directives/favorit.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { FavoriteConfirmationDialog } from './dialogs/favorite-confiramtion.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchResultComponent,
    SearchComponent,
    FavoritDirective,
    FavoriteConfirmationDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    NoopAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
