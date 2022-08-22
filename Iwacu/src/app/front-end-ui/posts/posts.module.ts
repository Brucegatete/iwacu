import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "../../angular-material.module";
import { FormsModule } from "@angular/forms";
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


import { SearchComponent } from "./search/search.component";
import { PostListComponent } from "./post-list/post-list.component";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostDetailsComponent } from "./post-details/post-details.component";





@NgModule({
  declarations: [PostCreateComponent, PostListComponent, SearchComponent, PostDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule

  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ]
})

export class PostsModule {}
