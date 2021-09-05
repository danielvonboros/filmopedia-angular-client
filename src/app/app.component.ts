// Core modules
import { Component } from '@angular/core';

// components
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';

// material components
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'filmopedia-Angular-client';

  constructor(public dialog: MatDialog) { }
  // the function that will be opened once the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning a width to the dialog
      width: '280px'
    });
  }

}
