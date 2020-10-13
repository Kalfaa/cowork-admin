export interface ILogin {
  token: string;
}

export class User {
  id: string;
  username: string;
  token: any;
}


export class OpenSpace {
  id: string;
  description: string;
  name: string;
  rooms:Room[];
  tools:Tool[];
  openHours:OpenHours;
}


export class Room {
  id: string;
  name: string;
  description: string;
}

export class Tool {
  id: string;
  name: string;
  type:ToolType;
}

export class SortedTool{
  laptops:Tool[];
  printers:Tool[];
  others:Tool[]
}


export enum ToolType {
  TOOL = "TOOL",
  PRINTER = "PRINTER",
  LAPTOP ="LAPTOP"
}


export class HourRange{
  constructor(public start:any ="9:00", public end:any="21:00") {}

  convertHourRangeToInt(){
    let res = new HourRange();
    res.start = parseInt(this.start);
    res.end = parseInt(this.end);
    return res;
  }

  static convertHourRangeToString(hourRange:HourRange){
    let res = new HourRange();
    res.start = hourRange.start.toString()+':00';
    res.end = hourRange.end.toString()+':00';
    return res;
  }

}

export class OpenHours{
  monday:HourRange = new HourRange();
  tuesday:HourRange = new HourRange();
  wednesday:HourRange = new HourRange();
  thursday:HourRange = new HourRange();
  friday:HourRange = new HourRange();
  saturday:HourRange = new HourRange();
  sunday:HourRange = new HourRange();


  convertHourRangeToInt(){
   let res = new OpenHours();
   res.monday = this.monday.convertHourRangeToInt();
   res.tuesday = this.tuesday.convertHourRangeToInt();
   res.wednesday = this.wednesday.convertHourRangeToInt();
   res.thursday = this.thursday.convertHourRangeToInt();
   res.friday = this.friday.convertHourRangeToInt();
   res.saturday = this.saturday.convertHourRangeToInt();
   res.sunday = this.sunday.convertHourRangeToInt();
   return res;
  }

  static convertHourRangeToString(openHours:OpenHours){
    let res = new OpenHours();
    res.monday = HourRange.convertHourRangeToString(openHours.monday);
    res.tuesday = HourRange.convertHourRangeToString(openHours.tuesday);
    res.wednesday = HourRange.convertHourRangeToString(openHours.wednesday);
    res.thursday = HourRange.convertHourRangeToString(openHours.thursday);
    res.friday = HourRange.convertHourRangeToString(openHours.friday);
    res.saturday = HourRange.convertHourRangeToString(openHours.saturday);
    res.sunday = HourRange.convertHourRangeToString(openHours.sunday);
    return res;
  }
}
