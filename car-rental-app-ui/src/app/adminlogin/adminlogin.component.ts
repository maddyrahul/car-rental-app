import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AdminServiceService } from '../services/admin-service.service';
import { UtilityService } from '../utilty.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  adminloginForm!: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private navigationService: AdminServiceService,
    private utilityService: UtilityService, private router: Router
  ) { }

  ngOnInit(): void {
    this.adminloginForm = this.fb.group({
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

  adminlogin() {
    this.navigationService
      .adminloginUser(this.Email.value, this.PWD.value)
      .subscribe((res: any) => {
        if (res.toString() !== 'invalid') {

          this.message = 'Logged In Successfully.';
          this.utilityService.setadminUser(res.toString());
          this.router.navigate(['car-details']);
          setTimeout(() => {
           
            window.location.reload();
          }, .1000);

          console.log(this.utilityService.admingetUser());
        
        } else {
          this.message = 'Invalid Credentials!';
        }
      }, (error) => {
        console.error('Error during login:', error);
        this.message = 'An error occurred during login.';
      });
  }


  get Email(): FormControl {
    return this.adminloginForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.adminloginForm.get('pwd') as FormControl;
  }


}
