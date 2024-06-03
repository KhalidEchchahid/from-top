import { TextField, Chip } from "@material-ui/core";
import React from 'react'
import Autocomplete from '@mui/material/Autocomplete';

const ChipInput = ({tags , setTags}) => {


    return (
      <Autocomplete
      sx={{margin : '8px 0px'}}
        multiple
        id="tags-filled"
        options={[]}
        defaultValue={[]}
        freeSolo
        renderTags={(value,getTagProps) => value.map((option, index) => {
              setTags(value);
              return (
                      <Chip
                        key={index}
                        label={option}
                        {...getTagProps({ index })}
                      />
              );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined' 
            label="Search By Tags"
            fullWidth
            placeholder="Add a receiver by pressing enter after its dotName or address"
          />
        )}
      />
    );
}

export default ChipInput
