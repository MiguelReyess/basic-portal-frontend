import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginInterface } from 'src/app/interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide: boolean = true;
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
  loginForm = this.formBuilder.group({
    email: ['test@test.com',[Validators.required, Validators.email]],
    password: ['',Validators.required]
  })
  messageError:boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService ) { }

  ngOnInit() {
  }
 get email(){
  return this.loginForm.controls.email
 }
 get password(){
  return this.loginForm.controls.password
 }
  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginInterface).subscribe({
        next: (userData) => {
        },
        error: (errorData) =>{
          console.log(errorData);
          this.messageError = true
          
        },
        complete: () =>{
          console.info("LOGIN COMPLETO");
          this.router.navigateByUrl('/dashboard')
          this.loginForm.reset()
        }
      })
    }
    else{
      this.loginForm.markAllAsTouched()
      alert("ERROR")
    }
  }

}
