import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OpenSpaceService} from "../open-space.service";
import {RoomService} from "../room.service";

@Component({
  selector: 'app-dialog-room',
  templateUrl: './dialog-room.component.html',
})
export class DialogRoomComponent implements OnInit{
  fileToUpload: File;
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {this.form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    file: ['', Validators.required],
  });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
