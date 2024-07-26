import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AdminServiceService } from '../services/admin-service.service';
import { UtilityService } from '../utilty.service';
import { Router } from '@angular/router';
import { User } from '../models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message = '';
  sharedRes = 0;
  constructor(
    private fb: FormBuilder,
    private navigationService: AdminServiceService,
    private utilityService: UtilityService, private router: Router
  ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }


  login() {
    this.navigationService.loginUser(this.Email.value, this.PWD.value).subscribe((res: any) => {
      if (res.toString() !== 'invalid') {

        this.navigationService.setUserData(res);

        // Store the userId in localStorage
        localStorage.setItem('sharedRes', res.userId.toString());

        this.message = 'Logged In Successfully.';
        this.utilityService.setUser(res.toString());
        this.router.navigate(['/home']);

        // Log the sharedRes value immediately after a successful login
        console.log("userId", res.userId);
      } else {
        this.message = 'Invalid Credentials!';
      }
    }, (error) => {
      console.error('Error during login:', error);
      this.message = 'An error occurred during login.';
    }
    );
  }




  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }

}
