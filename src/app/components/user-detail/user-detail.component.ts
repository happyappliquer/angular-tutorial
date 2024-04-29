import { Component, inject, OnInit } from '@angular/core';
import { RespGetUser } from '../../api-service/modals/GetUser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from '../../api-service/todo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../api-service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(UserService);
  private userService = inject(UserService);
  

  user: RespGetUser | null = null;

  ngOnInit() {
    const id = this['route'].snapshot.paramMap.get('id') ?? '';
    this.getuserById(id);
  }

  getuserById(id: string) {
   this.userService.GetUserById(id).subscribe({
    next: (resp) => {
      this.user = resp;
    },
    error: (err: HttpErrorResponse) => {
      this['router'].navigateByUrl('/users');
    },
   });
  }
}
