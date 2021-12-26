import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import{ MatInputModule } from '@angular/material/input';
import{ MatCardModule } from '@angular/material/card';
import{ MatButtonModule} from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http"


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ItemCollectionComponent } from './item-collection/item-collection.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostListComponent } from './post-list/post-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemCollectionComponent,
    PostCreateComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
