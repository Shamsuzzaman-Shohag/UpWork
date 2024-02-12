import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type LoaderProps = {
  isLoading: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {

  return (
    <div>
      <Backdrop
        sx={{ color: 'green', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loader;