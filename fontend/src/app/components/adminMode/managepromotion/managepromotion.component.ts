import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-managepromotion',
  templateUrl: './managepromotion.component.html',
  styleUrls: ['./managepromotion.component.css']
})
export class ManagepromotionComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }
  backClicked() {
    this._location.back();
  }

}
