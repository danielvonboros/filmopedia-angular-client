// Core modules
import { Component, OnInit, Input } from '@angular/core';

// components
import { FetchDataApiService } from '../fetch-api-data.service';

// Material modules
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * Required form fields for the user registration
   */
  @Input() userData = { username: '', password: '', email: '', birthday: ''};

  constructor(
    public fetchApiData: FetchDataApiService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Register a new user and save user information and login credentials to the database
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(() => {
      // Logic for successful user registration needs to be implemented here!
      this.dialogRef.close(); // will close the modal on success
      this.snackBar.open('Welcome, you are now registered. You can now go to login', 'OK', {
        duration: 3000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 3000
      });
    });
  }

}
