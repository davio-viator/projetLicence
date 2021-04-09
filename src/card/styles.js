import { red } from '@material-ui/core/colors';

const styles = theme => ({
  root: {
    maxWidth: 345,
    boxShadow:'none'
  },
  media: {
    height: 0,
    // paddingTop: '56.25%', // 16:9
    paddingTop:'100%',
    width: '100%' ,
    height: '100%' ,
    backgroundPosition: 'center center' ,
    backgroundRepeat: 'no-repeat' ,
    backgroundSize: '260px' ,
    cursor: 'pointer' ,
    border: 'none' ,
    backgroundColor: 'transparent' ,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    // transform: 'rotate(180deg)',
    transform: 'rotate(-360deg)'
  },
  avatar: {
    backgroundColor: red[500],
  },
  textSize:{
    fontSize:'12px !important ',
  },
  cardTextHeight:{
    height:60,
    
  }
});

export default styles;