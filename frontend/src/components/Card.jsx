import Box from '@mui/material/Box';
import MCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";



export default function Card({id, name, area, rating, cuisine_type}) {
  return (
    <MCard sx={{ minWidth: 275, marginY: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{area}</Typography>
        <Typography variant="body2">
          Cuisine Type: {cuisine_type}
        </Typography>
        <Typography variant="body2">
          Rating: {rating}
        </Typography>

      </CardContent>
      <CardActions>
        <Link to={`/restaurants/${id}`}>
        <Button size="small">Visit</Button>
        </Link>
      </CardActions>
    </MCard>
  );
}
