import { Component, ElementRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { AdminLoginUser, User } from '../models/models';
import { LoginComponent } from '../login/login.component';
import { UtilityService } from '../utilty.service';
import { Router } from '@angular/router';
import { AdminloginComponent } from '../adminlogin/adminlogin.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('modalTitle') modalTitle!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  constructor(public utilityService: UtilityService, public router: Router) { }


  loggedInUser: User | null = null;
  adminloggedInUser: AdminLoginUser | null = null;
 


  ngOnInit(): void {
    
  }
  logoutUser() {
    console.log('Logout button clicked');
    this.utilityService.logoutUser();
  
    if (this.utilityService.isadminLoggedIn() as boolean) {
      this.adminloggedInUser = this.utilityService.admingetUser();
    } else {
      this.loggedInUser = null;
    }
  
    this.router.navigate(['/home']);
  }
  
}
