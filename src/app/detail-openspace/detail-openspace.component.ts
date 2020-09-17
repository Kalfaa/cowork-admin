import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {OpenSpaceService} from "../open-space.service";
import {first} from "rxjs/internal/operators";
import {OpenSpace} from "../interface/login";
import {MatDialog} from "@angular/material/dialog";
import {DialogRoomComponent} from "./dialog-room.component";
import {RoomService} from "../room.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToolService} from "../tool.service";

@Component({
  selector: 'app-detail-openspace',
  templateUrl: './detail-openspace.component.html',
  styleUrls: ['./detail-openspace.component.css']
})
export class DetailOpenspaceComponent implements OnInit {
  openSpaceId: string;
  panelOpenState = false;
  openSpace: OpenSpace;
  tools;
  form: FormGroup;
  displayedColumns: string[] = ['name'];
  constructor(private fb: FormBuilder,private route: ActivatedRoute, private openSpaceService: OpenSpaceService, public dialog: MatDialog,public roomService:RoomService,public toolService:ToolService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.openSpaceId = params.get('id');
      this.openSpaceService.readOne(this.openSpaceId).pipe(first())
        .subscribe(
          data => {
            console.log(data);
            //this.dataSource.data=data as OpenSpace[]
            this.openSpace = data;
          },
          error => {
            console.log(error);
          });
    });
  }

  getRooms() {
    return (this.openSpace && this.openSpace.rooms) ? this.openSpace.rooms : []
  }

  getTools() {
    return (this.openSpace && this.openSpace.tools) ? this.openSpace.tools : []
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogRoomComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log(result.controls.name.value);
      this.roomService.post(result.controls.name.value,result.controls.description.value,this.openSpaceId).pipe(first())
        .subscribe(
          data => {
            console.log(data);
            this.openSpaceService.readOne(this.openSpaceId).pipe(first())
              .subscribe(
                data => {
                  console.log(data);
                  //this.dataSource.data=data as OpenSpace[]
                  this.openSpace = data;
                },
                error => {
                  console.log(error);
                });
          },
          error => {
            console.log(error);
            console.log('eheheh');
          });
    });

  }

  createTool(){
    this.openSpaceService.addTool(this.form.controls.name.value,this.openSpaceId).pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.openSpaceService.readOne(this.openSpaceId).pipe(first())
            .subscribe(
              data => {
                console.log(data);
                //this.dataSource.data=data as OpenSpace[]
                this.openSpace = data;
              },
              error => {
                console.log(error);
              });
        },
        error => {
          console.log(error);
          console.log('eheheh');
        });
  }
}
