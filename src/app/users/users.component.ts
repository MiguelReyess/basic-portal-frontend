// import { serService } from '../services/user.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserService } from '../services/user.service';

export interface UserData {
  id?: number;
  name?: string;
  email?: string;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<UserData>([]);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getUsers()

  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (userData) => {

        this.dataSource.data = userData;
      },
      error: (errorData) => {
        console.log(errorData);
      }
    });
  }

  openDialog(action: string, user?: UserData) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '300px',
      data: { action, user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'edit') {
          this.editUser(result);
        } else if (action === 'add') {
          this.addUser(result);
        }
      }
    });
  }

  addUser(newUser: UserData) {
    this.dataSource.data.push(newUser);
    this.dataSource.data = [...this.dataSource.data];
  }

  editUser(updatedUser: UserData) {
    const index = this.dataSource.data.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.dataSource.data[index] = updatedUser;
      this.dataSource.data = [...this.dataSource.data];
    }

  }

  deleteUser(userId: number) {
    this.userService.deleteUserById(userId).subscribe({
      next: (userData) => {
      },
      error: (errorData) => {
        console.log(errorData);
      }
    });
    const index = this.dataSource.data.findIndex(user => user.id === userId);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    }
  }
}
