import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Timesheet from 'src/app/models/Timesheet';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  altezza = 0
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

  @ViewChild('timeline')
  timeline!: ElementRef;
  @ViewChild('downloadLink')
  downloadLink!: ElementRef;


  constructor(@Inject(DOCUMENT) private document: Document, private formbuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.drawLines();
  }

  drawLines() {

    if (this.data.length > 0) {
      this.message = undefined;
      this.minYear = parseInt(this.data.reduce((prev, curr) => prev[0] < curr[0] ? prev : curr)[0].split("/")[1])
      this.maxYear = parseInt(this.data.reduce((prev, curr) => prev[1] > curr[1] ? prev : curr)[1].split("/")[1])
      this.altezza = this.data.length * this.lineHeigth + 39;
      new Timesheet(this.document.querySelector('#timesheet'), this.minYear, this.maxYear, this.data);
      this.saveAsImage()

    } else {
      this.message = `Click the "add a time-line" button to see magic :)`
      this.document.querySelector('#timesheet')!!.innerHTML = "";
      this.altezza = 0;
    }
  }


  onSubmit() {
    this.data.push([this.timelineForm.value.start?.split("-")[1] + "/" + this.timelineForm.value.start?.split("-")[0], this.timelineForm.value.end?.split("-")[1] + "/" + this.timelineForm.value.end?.split("-")[0], this.timelineForm.value.label ?? "", this.timelineForm.value.category ?? ""])
    this.drawLines();
  }

  editLine(index: number) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        line: this.data[index],
        index: index
      }
    })

    dialogRef.afterClosed().subscribe((result: string[]) => {
      if (result) {
        this.data[index] = result
        this.drawLines()
      }
    })
  }

  deleteLine(index: number) {
    if (confirm(`Are you sure you want to delete the time-line #${index}?`)) {
      this.data.splice(index, 1)
      this.drawLines();
    }
  }

  saveAsImage() {
    /* Converting the html element to a canvas element and then converting it to a png image. */
    html2canvas(this.timeline.nativeElement).then((canvas: any) => {
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = `timeline-${new Date().toJSON().replace("T", "-").slice(0, -5)}.png`;
    });
  }

}


