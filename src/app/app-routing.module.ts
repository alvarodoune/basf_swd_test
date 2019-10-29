import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {AdminComponent} from './admin/admin.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthenticationGuard} from './authentication.guard';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FileIntakeComponent} from './file-intake/file-intake.component';
import {ChatBotComponent} from './chat-bot/chat-bot.component';
import {AuthResolver} from './auth.resolver';
import {PrivatehomeComponent} from './privatehome/privatehome.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'file-intake',
    component: FileIntakeComponent
  },
  {
    path: 'chatbot',
    component: ChatBotComponent,
    canActivate: [
      AuthenticationGuard
    ],
    resolve: {
      chatbot: AuthResolver
    }
  },
  {
    path: 'privatehome',
    component: PrivatehomeComponent,
    canActivate: [
      AuthenticationGuard
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [
      AuthenticationGuard
    ]
  },
  // always last
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // imports: [
  //   CommonModule
  // ],
  // declarations: []
  providers: [AuthenticationGuard, AuthResolver]
})
export class AppRoutingModule {
}
