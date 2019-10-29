import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-privatehome',
  templateUrl: './privatehome.component.html',
  styleUrls: ['./privatehome.component.scss']
})
export class PrivatehomeComponent implements OnInit {

  public isLoading = true;

  constructor() {
  }

  ngOnInit() {
    this.isLoading = true;
  }

  frameLoaded(event: any) {
    this.isLoading = false;
  }
}
