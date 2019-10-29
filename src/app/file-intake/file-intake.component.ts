import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-intake',
  templateUrl: './file-intake.component.html',
  styleUrls: ['./file-intake.component.scss']
})
export class FileIntakeComponent implements OnInit {

  isBusy = false;

  constructor() {
  }

  ngOnInit() {
  }


  uploadFile(event: any) {
    const that = this;
    this.isBusy = true;
    setTimeout(function () {
      that.isBusy = false;
    }, 1200);
  }
}
