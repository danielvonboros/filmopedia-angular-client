// Core modules
import { Component, OnInit, Input } from '@angular/core';

// components
import { FetchDataApiService } from '../fetch-api-data.service';

// Material modules
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  @Input() userData = { 
    username: '', 
    password: '', 
    email: '', 
    birthday: '',
  };

  constructor(
    public fetchApiData: FetchDataApiService,
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // function responsible for sending form inputs to backend
  editProfile(): void {
    this.fetchApiData.editUserProfile(this.userData).subscribe((res) => {
      // Logic for successful user registration needs to be implemented here!
      this.dialogRef.close();
      localStorage.setItem('username', res.username)
      console.log(res)
      this.snackBar.open(this.userData.username, 'Successfully updated user details!', {
        duration: 3000
      });
    }, (res) => {
      this.snackBar.open(res, 'OK', {
        duration: 3000
      });
      setTimeout(function () {
        window.location.reload();
       }, 3500);
      })}
}