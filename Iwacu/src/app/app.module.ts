import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';






import { AppComponent } from './app.component';
import { HeaderComponent } from './front-end-ui/header/header.component';
import { ErrorComponent } from './error/error.component';
import { ProfileComponent } from './front-end-ui/profile/profile.component';
import { MyCartComponent } from './front-end-ui/my-cart/my-cart.component';

import { AuthInterceptor } from './interceptors/auth-interceptor'
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { AngularMaterialModule } from "./angular-material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostsModule } from './front-end-ui/posts/posts.module';
import { AuthModule } from './front-end-ui/auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    ProfileComponent,
    MyCartComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    AngularMaterialModule,
    PostsModule,
    AuthModule,
    FormsModule,
    MatMenuModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
