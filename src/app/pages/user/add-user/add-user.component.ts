import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../api-service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RespGetUser } from '../../../api-service/modals/GetUser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  private router = inject(Router);
  private UserService = inject(UserService);
  private toastr = inject(ToastrService);

  user: RespGetUser | null = null;
  ngOnInit() {}

  name: string = '';
  username: string = '';
  password: string = '';
  county: string = '';

  
  countries = [
    {id: 1, name: "United States"},
    {id: 2, name: "Australia"},
    {id: 3, name: "Canada"},
    {id: 4, name: "Brazil"},
    {id: 5, name: "England"}
 ];
 selectedValue = null;

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

     this.UserService.Userexists(this.username).subscribe({
      
     })

    this.UserService.createUser(this.name, this.username, this.password).subscribe({
      next: () => {
        this.toastr.success('Record created successfully');
        this.router.navigate(['/users']);
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err?.error ?? 'Something went wrong', 'Error');
      },
    });
  }

  validateForm() {
    if (this.name.trim() == '') {
      this.toastr.warning('Name is required', 'Invalid');
      return false;
    }
    if (this.password.trim() == '') {
      this.toastr.warning('Password is required', 'Invalid');
      return false;
    }

    return true;
  }

}
