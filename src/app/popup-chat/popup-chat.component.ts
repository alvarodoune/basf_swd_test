import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-popup-chat',
  templateUrl: './popup-chat.component.html',
  styleUrls: ['./popup-chat.component.scss']
})
export class PopupChatComponent implements OnInit {

  isHidden = true;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  toggleChat() {
    this.isHidden = !this.isHidden;
  }

  isSignedIn(): boolean {
    return this.auth.isSignedIn();
  }

  onBootPage(): boolean {
    return this.router.url === '/chatbot';
  }
}
