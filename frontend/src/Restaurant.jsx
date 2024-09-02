import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ItemCard } from "./components/ItemCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box"

export const Restaurant = () => {
  const [restaurantData, setRestaurantData] = useState({
    id: 1,
    name: "Lal Cafe",
  });
  const [menuData, setMenuData] = useState([
    {
      id: 1,
      name: "Chicken rice",
      description: "Some description",
      price: 90,
      dietary_tags: "Non veg",
    },
    {
      id: 2,
      name: "Chicken rice",
      description: "Some description",
      price: 90,
      dietary_tags: "Non veg",
    },
    {
      id: 3,
      name: "Chicken rice",
      description: "Some description",
      price: 90,
      dietary_tags: "Non veg",
    },
  ]);
  let { id } = useParams();

  useEffect(() => {
    fetchRestaurantById(id);
    fetchMenuById(id);
  }, []);

  const fetchRestaurantById = async (id) => {
    const response = await fetch(`http://localhost:8080/api/restaurant/${id}`);
    const data = await response.json();
    if (data.result.length == 0) return;
    setRestaurantData(data.result[0]);
  };

  const fetchMenuById = async (id) => {
    const response = await fetch(
      `http://localhost:8080/api/restaurant/menu/${id}`
    );
    const data = await response.json();
    setMenuData(data.result);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {restaurantData && menuData && (
        <>
          <h1>{restaurantData.name}</h1>

          <Grid sx={{width: '100%'}} container spacing={2}>
            {menuData.map((m) => (
              <Grid item sx={{width: '100%'}} xs={10} sm={6} md={3}>
                <ItemCard key={m.id} {...m} />
              </Grid>
            ))}
          </Grid>
          </>
      )}
    </Box>
  );
};
