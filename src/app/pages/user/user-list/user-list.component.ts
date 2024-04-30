import { Component, Inject, inject, OnInit } from '@angular/core';
import { RespGetUser } from '../../../api-service/modals/GetUser';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../api-service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private userService = inject(UserService);



  ngOnInit() : void{
    this.getuser();
  }
  userList: RespGetUser[] = [];

  
  getuser() {
    this.userList = [];
    this.userService.GetUser().subscribe({
      next: (resp) => {
        this.userList = resp;
      },
      error: () => {
        this.toastr.error('Something went wrong', 'Error');
      },
    });
  }


  onClickDetail(item: RespGetUser) {
    this.router.navigate(['/users', 'detail', item.id]);
  }

  onClickEdit(item: RespGetUser) {
    this.router.navigate(['/users', 'edit', item.id]);
  }

  onClickDelete(item: RespGetUser) {
    
    this.userService.DeleteUser(item.id).subscribe({
      next: (resp) => {
        this.toastr.success('deleted successfully');
        this.getuser();
      },
      error: () => {
        this.toastr.error('Something went wrong', 'Error');
      },
    });
    
  }
}
