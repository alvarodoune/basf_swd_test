import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatTabsModule, MatToolbarModule, MatProgressBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FileIntakeComponent} from './file-intake/file-intake.component';
import {ChatBotComponent} from './chat-bot/chat-bot.component';
import {PrivatehomeComponent} from './privatehome/privatehome.component';
import {ProfileComponent} from './profile/profile.component';
import {NavComponent} from './nav/nav.component';
import {EmbReportService} from './emb-report.service';
import {PopupChatComponent} from './popup-chat/popup-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SignInComponent,
    AdminComponent,
    HomeComponent,
    DashboardComponent,
    FileIntakeComponent,
    ChatBotComponent,
    PrivatehomeComponent,
    ProfileComponent,
    NavComponent,
    PopupChatComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    EmbReportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
