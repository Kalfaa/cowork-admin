import { Component, OnInit } from '@angular/core';
import {OpenSpace} from "../interface/login";
import {first} from "rxjs/internal/operators";
import {OpenSpaceService} from "../open-space.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})



export class EditReservationComponent implements OnInit {
  openSpaces :OpenSpace[];
  displayedColumns: string[] = ['position', 'name', 'description'];
  dataSource;

  constructor(private openSpace:OpenSpaceService,private router:Router) {
  }

  ngOnInit(): void {
    this.openSpace.read()
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          //this.dataSource.data=data as OpenSpace[]
          this.dataSource = data;
        },
        error => {
          console.log(error);
        });

  }

  getDetail(id){
    this.router.navigate(['/detail-openspace', id]);
  }

}
