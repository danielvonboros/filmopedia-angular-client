// Core modules
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// custom components
import { FetchDataApiService } from '../fetch-api-data.service';

// Material components
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData= { username: '', password: '' }
  router: any;

  constructor(
    public fetchApiData: FetchDataApiService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {}

  // function for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(() => {
      this.dialogRef.close();
      this.router.navigate(['movies']);
      this.snackBar.open('Login successful', 'OK', {
        duration: 2000
      });
      
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      })
    })
  }

}
