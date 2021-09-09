// core modules
import { Component, Inject, Input, OnInit } from '@angular/core';

// custom components

// material modules
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-card',
  templateUrl: './synopsis-card.component.html',
  styleUrls: ['./synopsis-card.component.css']
})
export class SynopsisCardComponent implements OnInit {

  constructor(

    /**
     * uses Inject to get movie details from the movie object
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title:string,
      imageUrl:any,
      description:string,
      year: number,
    }

  ) { }

  ngOnInit(): void {
  }

}
