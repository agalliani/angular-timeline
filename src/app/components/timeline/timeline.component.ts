import { Component, OnInit } from '@angular/core';
import Timesheet from 'src/app/models/Timesheet';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';



@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  altezza = 1
  lineHeigth = 32;
  data: string[][] = []

  timelineForm = this.formbuilder.group({
    start: "2018-02",
    end: "2023-01",
    label: "This is a label",
    category: ""
  })

  minYear!: number;
  maxYear!: number;

  message: string | undefined;

  constructor(@Inject(DOCUMENT) private document: Document, private formbuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.drawLines();
  }

  drawLines() {

    if (this.data.length > 0) {
      this.message = undefined;
      this.minYear = parseInt(this.data.reduce((prev, curr) => prev[0] < curr[0] ? prev : curr)[0].split("/")[1])
      this.maxYear = parseInt(this.data.reduce((prev, curr) => prev[1] > curr[1] ? prev : curr)[1].split("/")[1])
     console.log(this.minYear, this.maxYear)

      this.altezza = this.data.length * this.lineHeigth + 39;



      new Timesheet(this.document.querySelector('#timesheet'), this.minYear, this.maxYear, this.data);
    } else {
      this.message = "Click the add a time-line button to see magic :)"
      this.document.querySelector('#timesheet')!!.innerHTML="";


    }

  }


  onSubmit() {
    this.data.push([this.timelineForm.value.start?.split("-")[1] + "/" + this.timelineForm.value.start?.split("-")[0], this.timelineForm.value.end?.split("-")[1] + "/" + this.timelineForm.value.end?.split("-")[0], this.timelineForm.value.label ?? "", this.timelineForm.value.category ?? ""])
    console.log(this.data)
    this.drawLines();

  }

  editLine(index: number) {
    console.log("you want to edit", this.data[index])
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: "auto",
      data: this.data[index]
    })

    dialogRef.afterClosed().subscribe((result: string[]) => {
      this.data[index] = result
      this.drawLines()
    })
  }

  deleteLine(index: number) {
    this.data.splice(index, 1)
    this.drawLines();
  }

}
