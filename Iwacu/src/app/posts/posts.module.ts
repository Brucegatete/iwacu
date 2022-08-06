import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "../angular-material.module";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostListComponent } from "./post-list/post-list.component";
import { FormsModule } from "@angular/forms";
import { SearchComponent } from "./search/search.component";
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [PostCreateComponent, PostListComponent, SearchComponent],
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
