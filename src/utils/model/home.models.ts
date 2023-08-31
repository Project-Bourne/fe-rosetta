import React from 'react';
interface ListItemModels {
  uuid?: string | number;
  isArchived? : any;
  translateid?:any;
  title?: string;
  translation?: any;
  numberOfSummary?: string | number;
  time?: string;
  actionButtons?: React.ReactNode;
  viewDeleteButtons?: React.ReactNode;
  buttonType?: string;

}
export default ListItemModels;