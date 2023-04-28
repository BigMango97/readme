export interface specificnovelSearchType {
    novelId : number;
    title: string;
    description :string,
    author :string,
    genre:string,
    grade : number,
    thumbnail :string,
    startDate : Date,
    serializationDays: number,
    views : number,
    serializationStatus:string,
    tag :[tagType],
    scheduleld:string,
    starRating:string,
  }
  export interface tagType {
    id : number;
    name: string;

  }
