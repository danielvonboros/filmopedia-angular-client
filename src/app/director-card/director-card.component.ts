// core modules
import { Component, Inject, Input, OnInit } from '@angular/core';

// custom components

// material modules
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.css']
})
export class DirectorCardComponent implements OnInit {

  constructor(

    /**
     * uses Inject to get movie details from the movie object
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name:string,
      bio:string,
      birthYear:number,
      deathYear:number,
    }

  ) { }

  ngOnInit(): void {
  }

}
