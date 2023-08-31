import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { blue } from '@mui/material/colors';
import names from "@/utils/languages.json"
 

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


// function getStyles(name: string, personName: string[], theme: Theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

export default function MultipleSelect({ selectedLanguage, handleChange }) {

  return (
    <div>
      <FormControl sx={{borderBottom:"2px solid #4582C4", width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Language</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={selectedLanguage}
          onChange={handleChange}
          input={<OutlinedInput label="Language" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name.name}
              value={name.key}
            >
              {name.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
