import React from 'react';
interface ListItemModels {
  uuid?: string | number;
  isArchived? : any;
  title?: string;
  summary?: any[];
  numberOfSummary?: string | number;
  time?: string;
  actionButtons?: React.ReactNode;
  viewDeleteButtons?: React.ReactNode;
  buttonType?: string;

}
export default ListItemModels;