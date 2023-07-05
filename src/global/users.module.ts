export interface TableBodyDataModel {
    id: number,
    name: string,
    type: string,
    designation: string,
    status: string,
}

export interface ActivityCardModel {
    id?: number,
    docId: number,
    actionText: string,
    activityText: string,
    time: string
}