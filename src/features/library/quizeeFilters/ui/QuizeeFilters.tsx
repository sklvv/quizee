import { Box, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks";
import { setFilter, setSearchQuery } from "../model/librarySlice";
import { quizeeType } from "../model/libraryTypes";

const Search = () => {
  const dispatch = useAppDispatch();
  const { filterValue, searchQuery } = useAppSelector((state) => state.library);
  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: quizeeType | null
  ) => {
    if (newAlignment !== null) {
      dispatch(setFilter(newAlignment));
    }
  };
  const handleQuery = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setSearchQuery(e.target.value));
  };
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      width="34rem"
    >
      <Box width="50%">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
          value={searchQuery}
          onChange={(e) => handleQuery(e)}
        />
      </Box>

      <ToggleButtonGroup
        size="small"
        value={filterValue}
        exclusive
        onChange={handleFilter}
        color="primary"
        aria-label="quizee filter"
      >
        <ToggleButton value="my" aria-label="my" size="small">
          My Quizees
        </ToggleButton>
        <ToggleButton value="favourites" aria-label="fav" size="small">
          Favourites
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default Search;
