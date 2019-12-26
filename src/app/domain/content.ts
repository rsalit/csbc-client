
// export interface IContent {
//     webContentId: number;
//     title: string;
//     subTitle: string;
//     body: string;
//     location: string;
//     dateAndTime: string;
//     webContentTypeId: number;

// }

export class Content {
    public webContentId: number;
    public title: string;
    public subTitle: string;
    public body: string;
    public location: string;
    public dateAndTime: string;
    public expirationDate: Date;
    public webContentTypeId
    constructor() {
    }
}
