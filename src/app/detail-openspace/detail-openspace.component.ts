import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {OpenSpaceService} from '../open-space.service';
import {first} from 'rxjs/internal/operators';
import {HourRange, OpenHours, OpenSpace, SortedTool, Tool, ToolType, WorkEvent} from '../interface/login';
import {MatDialog} from '@angular/material/dialog';
import {DialogRoomComponent} from './dialog-room.component';
import {RoomService} from '../room.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToolService} from '../tool.service';
import {AddEventComponent} from './add-event.component';
import {EventService} from '../event.service';

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
  hourArray = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00','22:00','23:00'];
  openHours: OpenHours = new OpenHours();
  sortedTool: SortedTool;
  form: FormGroup;
  events: WorkEvent[] = [];
  displayedColumns: string[] = ['name'];
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private openSpaceService: OpenSpaceService, public dialog: MatDialog, public roomService: RoomService, public toolService: ToolService, public eventService: EventService) {
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
            this.openSpace = data;
            console.log( OpenHours.convertHourRangeToString(data.openHours));
            this.openHours = OpenHours.convertHourRangeToString(data.openHours);
            this.sortedTool = this.sortTool(this.openSpace.tools);
            this.eventService.readForOpenSpace(this.openSpaceId).pipe(first())
              .subscribe(
                data => {
                  this.events = data;
                },
                error => {
                  console.log(error);
                  console.log('eheheh');
                });
          },
          error => {
            console.log(error);
          });
    });
  }

  getRooms() {
    return (this.openSpace && this.openSpace.rooms) ? this.openSpace.rooms : [];
  }

  getTools() {
    return (this.openSpace && this.sortedTool.others) ? this.sortedTool.others : [];
}

  openDialog() {
    const dialogRef = this.dialog.open(DialogRoomComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.roomService.post(result.form.controls.name.value, result.form.controls.description.value, this.openSpaceId,result.file).pipe(first())
        .subscribe(
          data => {
            console.log(data);
            this.openSpaceService.readOne(this.openSpaceId).pipe(first())
              .subscribe(
                data => {
                  console.log(data);
                  // this.dataSource.data=data as OpenSpace[]
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

  openEventDialog() {
    const dialogRef = this.dialog.open(AddEventComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      this.eventService.post(result.form.controls.name.value, result.form.controls.description.value, this.openSpaceId, result.form.controls.date.value, result.file).pipe(first())
        .subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
            console.log('eheheh');
          });
    });

  }

  createTool(){
    this.openSpaceService.addTool(this.form.controls.name.value, this.openSpaceId).pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.openSpaceService.readOne(this.openSpaceId).pipe(first())
            .subscribe(
              data => {
                console.log(data);
                // this.dataSource.data=data as OpenSpace[]
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

  sortTool(tools: Tool[]): SortedTool{
    const res: SortedTool = {laptops: [], printers: [], others: []};
    tools.forEach(tool => {
      if (tool.type === ToolType.LAPTOP){
        res.laptops.push(tool);
      }else if (tool.type === ToolType.PRINTER){
        res.printers.push(tool);
      }else{
        res.others.push(tool);
      }
    });
    return res;
  }

  addLaptop() {
    this.openSpaceService.addTool('PC', this.openSpaceId, ToolType.LAPTOP).pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.openSpaceService.readOne(this.openSpaceId).pipe(first())
            .subscribe(
              data => {
                console.log(data);
                // this.dataSource.data=data as OpenSpace[]
                this.openSpace = data;
                this.sortedTool = this.sortTool(this.openSpace.tools);
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

  addPrinter() {
    this.openSpaceService.addTool('Printer', this.openSpaceId, ToolType.PRINTER).pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.openSpaceService.readOne(this.openSpaceId).pipe(first())
            .subscribe(
              data => {
                console.log(data);
                // this.dataSource.data=data as OpenSpace[]
                this.openSpace = data;
                this.sortedTool = this.sortTool(this.openSpace.tools);
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

  endValue(string){
    for (let i = 0; i < this.hourArray.length; i++){
      if (parseInt(string) === parseInt(this.hourArray[i])){
        return this.hourArray.slice(i + 1);
      }
    }
  }

  changeHours() {
    this.openSpaceService.changeHours(this.openSpaceId, this.openHours).pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.openSpaceService.readOne(this.openSpaceId).pipe(first())
            .subscribe(
              data => {
                console.log(data);
                // this.dataSource.data=data as OpenSpace[]
                this.openSpace = data;
                this.sortedTool = this.sortTool(this.openSpace.tools);
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
