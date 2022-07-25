import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import{ MatInputModule } from '@angular/material/input';
import{ MatCardModule } from '@angular/material/card';
import{ MatButtonModule} from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http"
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostListComponent } from './posts/post-list/post-list.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostCreateComponent,
    PostListComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    FlexLayoutModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
