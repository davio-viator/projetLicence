import {MenuItem} from '@material-ui/core/';
// import styles from '../login/styles';
import { withStyles } from '@material-ui/core/styles';

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}
))(MenuItem);


export default StyledMenuItem;