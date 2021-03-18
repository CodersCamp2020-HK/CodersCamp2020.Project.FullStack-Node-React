import './App.css';
import Button from '@material-ui/core/Button'
import theme from './themes/theme'
import {ThemeProvider} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  myBtn: {
    backgroundColor: 'red'
  }
})



function App() {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      <Button variant='contained' className={classes.myBtn}>Click me</Button>
    </div>
    </ThemeProvider>
    
  );
}

export default App;
