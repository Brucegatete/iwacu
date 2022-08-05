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

@NgModule({
  declarations: [PostCreateComponent, PostListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule

  ]
})

export class PostsModule {}
