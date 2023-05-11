export interface novelType{
    title: string;
    description: string;
    author: string;
    startDate: Date;
    serializationDay: number[];
    serializationStatus: string;
    thumbnail: string;
    authorComment: string;
    grade: string;
    genre: string
}
export interface tagType{
    id: number;
    name: string;
}

export interface inputNovelType{
    title: string;
    description: string;
    author: string;
    startDate: Date;
    serializationDay: string[];
    serializationStatus: string;
    thumbnail: string;
    authorComment: string;
    grade: number;
    genre: string;
    tag: tagType[];
}