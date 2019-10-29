import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../api.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public frm: FormGroup;

  public isBusy = false;
  public hasFailed = false;
  public showInputErrors = false;
  public error = '';
  public inputType = 'password';

  user = new FormControl('', [Validators.required]);
  pass = new FormControl('', [Validators.required]);

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.user.hasError('required') ? 'You must enter a value' : '';
  }

  getPassErrorMessage() {
    return this.pass.hasError('required') ? 'You must enter a value' : '';
  }

  showPass(event: any) {
    if (event.currentTarget && event.currentTarget['checked']) {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

  public doSignIn() {

    // Make sure form values are valid
    if (this.user.invalid || this.pass.hasError('required')) {
      this.showInputErrors = true;
      return;
    }

    // Reset status
    this.isBusy = true;
    this.hasFailed = false;
    this.error = '';

    // Grab values from form
    const username = this.user.value;
    const password = this.pass.value;

    // Submit request to API
    this.api
      .signIn(username, password)
      .subscribe(
        (response) => {
          this.auth.doSignIn(
            response.token,
            response.name
          );
          this.router.navigate(['privatehome']);
        },
        (error) => {
          this.user.reset();
          this.pass.reset();
          this.isBusy = false;
          this.hasFailed = true;
          this.error = error;
        }
      );
  }


}
