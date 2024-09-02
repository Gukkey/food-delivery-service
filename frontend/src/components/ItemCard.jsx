import Box from '@mui/material/Box';
import MCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export const ItemCard = ({name, description, price, tags}) =>  {
    return (
    <MCard sx={{  marginY: 2, padding: 0 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>₹ {price}</Typography>

        <Typography variant="body2">
            {description}
        </Typography>

      </CardContent>
      <CardActions>
        {/* <Link to={`/restaurants/${id}`}> */}
        <Button size="small">Add to Cart</Button>
        {/* </Link> */}
      </CardActions>
    </MCard>)
}