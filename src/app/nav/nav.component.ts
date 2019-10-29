import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
  }

  isSignedIn(): boolean {
    return this.auth.isSignedIn();
  }

  signOut() {
    this.auth.doSignOut();
  }

  onSignInPage(): boolean {
    return this.router.url === ('/sign-in');
  }
}
