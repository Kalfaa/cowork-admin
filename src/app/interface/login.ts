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
