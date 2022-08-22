import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostsService } from "src/app/services/post.service";

@Component({
  selector : 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  public searchTerm: String = "";

  constructor (private route: ActivatedRoute, private router: Router, private postService: PostsService) {
    this.route.params.subscribe(params => {
      if(params.searchTerm){
        this.searchTerm = params.searchTerm;
      } else {
        this.searchTerm = "";
      }
    });
    this.postService.getSearchTerm(this.searchTerm);
  }

  ngOnInit(): void {
  }

  search(): void {
    if(this.searchTerm){
      this.router.navigateByUrl('/search/' + this.searchTerm)
    }else {
      this.router.navigate(['/'])
    }

  }
}
