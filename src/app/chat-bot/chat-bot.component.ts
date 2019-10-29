import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {WatsonService} from '../watson.service';
import {Router} from '@angular/router';
import {DiscoveryService} from '../discovery.service';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit, OnDestroy {

  watsonChats = [];
  error: string;
  text = new FormControl('', [Validators.required]);
  isBusy = false;
  service: any;
  context: any;
  regex = /(<([^>]+)>)/ig;
  downloadSubscription: Subscription;
  sessionId: string;

  constructor(
    public assistant: WatsonService,
    public discovery: DiscoveryService,
    private router: Router) {
  }

  @ViewChild('chatContainer')
  chatContainer: any;

  @ViewChild('download')
  aElement: any;

  ngOnInit() {
    // Start conversation with empty message.
    this.callDiscoveryApi();
  }

  ngOnDestroy() {
    if (this.downloadSubscription) {
      this.downloadSubscription.unsubscribe();
    }
  }

  sendText(message?: string) {
    if (!this.isBusy) {
      this.processMessage(message || this.text.value, this.context);
    }
  }

  processMessage(input?: string, context?: any) {
    this.error = null;
    this.text.setValue('');
    this.text.clearValidators();

    if (input) {
      this.watsonChats.push({
        name: 'me',
        text: input
      });
    }
    this.scrollToBottom();
    this.isBusy = true;
    this.assistant.message(this.sessionId, input).subscribe(
      response => {
        this.context = response.context;
        response = response.output;
        // If an intent was detected, log it out to the console.
        if (response.intents.length > 0) {
          console.log('Detected intent: #' + response.intents[0].intent);
          switch (response.intents[0].intent) {
            case 'hello':
              console.log('Hello basf!');
              this.continueBotFlow(response);
              break;
            default:
              this.continueBotFlow(response);
          }
        } else {
          this.continueBotFlow(response);
        }
      },
      err => {
        console.error(err); // something went wrong
        this.showWatsonMessage('Something went wrong');
        this.error = 'Something went wrong';
      }
    );
  }

  continueBotFlow(response: any) {
    // Display the output from dialog, if any. Assumes a single text response.
    if (response.generic.length !== 0) {
      // console.log(response);
      response.generic.forEach((res: any) => {
        if (res.response_type === 'text') {
          this.watsonChats.push({
            name: 'watson',
            text: res.text
          });
        } else if (res.response_type === 'option') {
          this.watsonChats.push({
            name: 'option',
            text: res.description,
            options: res.options
          });
        } else if (res.response_type === 'image') {
          this.watsonChats.push({
            name: 'image',
            description: res.description,
            title: res.title,
            src: res.source
          });
        }
      });
    }
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const that = this;
    setTimeout(function () {
      that.chatContainer.nativeElement.scrollTop = that.chatContainer.nativeElement.scrollHeight;
    }, 300);
    this.isBusy = false;
  }

  showWatsonMessage(text: string) {
    this.isBusy = false;
    this.watsonChats.push({
      name: 'watson',
      text: text
    });

    this.scrollToBottom();
  }

  showWatsonLoading(text: string) {
    this.watsonChats.push({
      name: 'watson',
      text: 'Please wait, I am searching the information...'
    });
  }

  callDiscoveryApi() {
    this.showWatsonMessage('Hello, I am the Basf assistant, type something like: hello, hi or issue');
    this.isBusy = true;
    this.discovery.query().subscribe(res => {
      console.log(res); // session_id
      this.sessionId = res.session_id;
      this.isBusy = false;
    }, (error: any) => {
      this.isBusy = false;
      console.error(error);
      this.showWatsonMessage('Something went wrong with Session');
    });
  }

  onChatbotPage(): boolean {
    return this.router.url === '/chatbot';
  }

  removeLatestConversationNode() {

  }
}
