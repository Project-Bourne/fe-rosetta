import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HistoryIcon from '@mui/icons-material/History';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Histroy from './History';
import Bookmark from '../bookmark/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '@/redux/reducer/tabSlice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ padding: "0px !important", margin: "0px" }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function BasicTabs() {
  // const [value, setValue] = React.useState(0);
  const value = useSelector((state:any) => state.tab)
  const dispatch = useDispatch();

  const handleChange = (_, newValue: number) => {
    dispatch(setActiveTab(newValue));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <HistoryIcon style={{ marginRight: '8px' }} />
                History
              </div>
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BookmarkBorderIcon style={{ marginRight: '8px' }} />
                Bookmark
              </div>
            }
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <div role="tabpanel" hidden={value !== 0} className="py-2">
        <Histroy />
      </div>
      <div role="tabpanel" hidden={value !== 1} className="py-2">
        <Bookmark />
      </div>
    </Box>
  );
}