import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

type HeadingProps = {
  title: string;
}

const Heading = ({ title }: HeadingProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="20px">
      <Typography
        variant="h3"
        color={'#555555'}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Heading;
