import Bubble from "./Bubble";


export default class Timesheet {
  containerElement: any;
  data: any;
  year: {
    min: number,
    max: number
  }


  constructor(containerElement: any, min: number, max: number, data: any) {
    this.data = [];

    this.year = { min: min, max: max }



    this.parse(data || []);


    this.containerElement = containerElement
    this.drawSections();

    this.insertData();

  }



  parse(data: any[]) {
    for (let n = 0, m = data.length; n < m; n++) {
      const begin = this.parseDate(data[n][0]);
      const end = data[n].length === 4 ? this.parseDate(data[n][1]) : null;
      const lbl = data[n].length === 4 ? data[n][2] : data[n][1];
      const cat = data[n].length === 4 ? data[n][3] : data[n].length === 3 ? data[n][2] : 'default';


      if (begin.date.getFullYear() < this.year.min) {
        this.year.min = begin.date.getFullYear() - 1;
      }

      if (end && end.date.getFullYear() > this.year.max) {
        this.year.max = end.date.getFullYear();
      } else if (begin.date.getFullYear() > this.year.max) {
        this.year.max = begin.date.getFullYear();
      }

      this.data.push({ start: begin.date, end: end?.date, label: lbl, type: cat });
    }

  }



  /**
   * It takes a string that represents a date, and returns an object with a date property and a hasMonth
   * property.
   *
   * The date property is a Date object, and the hasMonth property is a boolean.
   *
   * The date property is a Date object that represents the first day of the month that the string
   * represents.
   *
   * The hasMonth property is true if the string represents a month, and false if the string represents a
   * year.
   *
   * The string can represent a month in one of two ways:
   *
   * 1. It can be a string that contains a month number and a year number, separated by a slash.

   * 2. It can be a string that contains only a year number.
   *
   * The month number can be one or two digits.
   *
   * The year number can be one, two, or four digits.
   *
   * If the string contains a month
   * @param {string} dateInfo - string - the date string that you want to parse
   * @returns An object with two properties: date and hasMonth.
   */
  parseDate(dateInfo: string) {
    const dateObj = { date: new Date, hasMonth: false }

    if (dateInfo.includes('/') === false) {
      dateObj.date = new Date(parseInt(dateInfo, 10), 0, 1);
      dateObj.hasMonth = false;
    }
    else {
      const splittedDateInfo = dateInfo.split('/');
      dateObj.date = new Date(parseInt(splittedDateInfo[1], 10), parseInt(splittedDateInfo[0], 10), -1, 1)
      dateObj.hasMonth = true

    }

    return dateObj
  }

  /**
   * It creates a new array, loops through the years, and pushes the years into the array. Then it adds
   * the array to the DOM.
   */
  drawSections() {
    const html = []

    for (let c = this.year.min; c <= this.year.max; c++) {
      html.push('<section>' + c + '</section>');
    }

    this.containerElement.className = 'timesheet color-scheme-default';





    this.containerElement.innerHTML = '<div class="scale">' + html.join('') + '</div>'


  }

  insertData() {
    const html: string[] = [];


    const widthMonth = this.containerElement?.querySelector('.scale section')?.offsetWidth;

    for (let n = 0, m = this.data.length; n < m; n++) {
      const cur = this.data[n];
      const bubble = this.createBubble(widthMonth, this.year.min, cur.start, cur.end);

      const line = [
        '<span style="margin-left: ' + bubble.getStartOffset() + 'px; width: ' + bubble.getWidth() + 'px;" class="bubble bubble-' + (cur.type || 'default') + '" data-duration="' + (cur.end ? Math.round((cur.end - cur.start) / 1000 / 60 / 60 / 24 / 39) : '') + '"></span>',
        '<span class="date">' + bubble.getDateLabel() + '</span> ',
        '<span class="label">' + cur.label + '</span>'
      ].join('');

      html.push('<li>' + line + '</li>');
    }

    html.push('<li>' + [
      '<span style="margin-left: ' + (widthMonth / 12) * (12) + 'px; width: ' + widthMonth + 'px;" class="bubble bubble-empty></span>',
    ].join('') + '</li>')


    this.containerElement.innerHTML += '<ul class="data">' + html.join('') + '</ul>';




  }
  createBubble(wMonth: any, min: number, start: any, end: any) {
    return new Bubble(wMonth, min, start, end);
  }




}
