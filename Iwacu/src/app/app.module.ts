import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import{ MatInputModule } from '@angular/material/input';
import{ MatCardModule } from '@angular/material/card';
import{ MatButtonModule} from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import {MatDialogModule} from '@angular/material/dialog';




import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostListComponent } from './posts/post-list/post-list.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { AuthInterceptor } from './interceptors/auth-interceptor'
import { ErrorInterceptor } from './interceptors/error-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostCreateComponent,
    PostListComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
