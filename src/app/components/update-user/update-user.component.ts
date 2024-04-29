import { Component, inject, OnInit } from '@angular/core';
import { RespGetUser } from '../../api-service/modals/GetUser';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../api-service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private userService = inject(UserService);
  

  user: RespGetUser | null = null;

  name: string = '';
  username: string = '';
  password: string = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.getUserById(id);
  }

  getUserById(id: string) {
    this.userService.GetUserById(id).subscribe({
      next: (resp) => {
        this.user = resp;
        this.name = this.user?.name;
        this.username = this.user?.username;
        this.password = this.user?.password;

      },
      error: (err: HttpErrorResponse) => {
        this.router.navigateByUrl('/users');
      },
    });
  }


  onClickUpdate($event: MouseEvent) {
    const el = $event.target as HTMLButtonElement;

    if (!this.validateForm()) {
      return;
    }

    this.userService
      .updateUser(this.user?.id || '', this.name, this.username, this.password)
      .subscribe({
        next: (resp) => {
          this.toastr.success('Record Updated successfully');
          this.router.navigate(['/users']);
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error(err?.error ?? 'Something went wrong', 'Error');
        },
      });
  }

  validateForm() {
    if (this.name.trim() == '') {
      this.toastr['warning']('Name is required', 'Invalid');
      return false;
    }
    if (this.password.trim() == '') {
      this.toastr.warning('Password is required', 'Invalid');
      return false;
    }

    return true;
  }
}
