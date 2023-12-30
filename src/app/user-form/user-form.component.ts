import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { SnackbarService } from '../services/snack-bar.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  userForm: FormGroup;
  password: string = '';
  hide: boolean = true;

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
  constructor(
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      id: [data?.user?.id || this.generateUniqueId(), Validators.required],
      name: [data.user ? data.user.name : '', Validators.required],
      email: [data.user ? data.user.email : '', [Validators.required, Validators.email]],
      password: ['',Validators.required] 
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  createOrEditUser(){
    if(this.data?.user?.id){
      this.userService.editUser(this.userForm.value as User).subscribe({
        next: (userData) => {
        },
        error: (errorData) =>{
          console.log(errorData);
          
        },
        complete: () =>{
          this.snackbarService.mostrarSnackbar('Confirmación: La información se ha guardado correctamente.');
        }
      })
    }else {
      this.userService.createUser(this.userForm.value as User).subscribe({
        next: (userData) => {
        },
        error: (errorData) =>{
          console.log(errorData);
          
        },
        complete: () =>{
          this.snackbarService.mostrarSnackbar('Confirmación: La información se ha guardado correctamente.');
        }
      })
    }
  }

  private generateUniqueId(): number {
    return Date.now()
  }
}
