import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListernerSubs: Subscription;
  creatorId: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.creatorId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListernerSubs = this.authService.getAuthStatusListener().subscribe(isAunthenticated => {
      this.userIsAuthenticated = isAunthenticated;
    });
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.authListernerSubs.unsubscribe();
  }


}
