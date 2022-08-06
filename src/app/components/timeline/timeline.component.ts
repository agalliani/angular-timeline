import { Component, OnInit } from '@angular/core';
import Timesheet from 'src/app/models/Timesheet';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  altezza = 1
  lineHeigth = 32;
  data = [
    ['2002', '09/2002', 'A freaking awesome time', 'lorem'],
    ['06/2002', '09/2003', 'Some great memories', 'ipsum'],
    ['2003', 'Had very bad luck'],
    ['10/2003', '2006', 'At least had fun', 'dolor'],
    ['02/2005', '05/2006', 'Enjoyed those times as well', 'ipsum'],
    ['07/2005', '09/2005', 'Bad luck again', 'default'],
    ['10/2005', '2008', 'For a long time nothing happened', 'dolor'],
    ['01/2008', '05/2009', 'LOST Season #4', 'lorem'],
    ['01/2009', '05/2009', 'LOST Season #4', 'lorem'],
    ['02/2010', '05/2010', 'LOST Season #5', 'lorem'],
    ['09/2008', '06/2015', 'FRINGE #1 & #2', 'ipsum'],

  ]



  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    console.log(this.altezza)
    this.altezza = this.data.length * this.lineHeigth + 70;
    new Timesheet(this.document.querySelector('#timesheet'), 2008, 2011, this.data);
  }



}
