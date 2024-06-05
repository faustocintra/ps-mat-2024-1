import React from 'react'
import { Box, Grid, Card, CardMedia, CardContent, Typography} from '@mui/material';

export default function HomePage() {
  return (
    <>
      <Typography variant="h3" color="secondary.light" fontFamily="Arial Black" textAlign="center">
        Bem-vindo ao sistema Karangos!
      </Typography>

      <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={image.url}
                alt={image.title}
              />
              <CardContent>
              <Typography 
                  variant="h5" 
                  component="div"
                  sx={{ color: 'primary.light', fontFamily: 'Arial' }} // Customização da cor e fonte
                >
                  {image.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {image.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  )
}

const images = [
  {
    url: 'https://www.chavesnamao.com.br/imn/0358X0250/N/veiculos/540632/6780194/20230826-154049-jpg-01.jpg',
    title: 'VW Gol 1964',
  },
  {
    url: 'https://lartbr.com.br/wp-content/uploads/2023/05/IMG_6232.jpeg',
    title: 'Chrevrolet Opala 1992',
  },
  {
    url: 'https://cdn-meloja.nyc3.cdn.digitaloceanspaces.com/stores/uploads/1887898/conversions/large.jpg',
    title: 'VW Fusca 1970',
  },
  {
    url: 'https://garagemdobellotetv.com.br/wp-content/uploads/2020/07/passat-ls_garagem-do-bellote-1.jpg?w=1200',
    title: 'VW Passat LS 1980',
  },
  {
    url: 'https://quatrorodas.abril.com.br/wp-content/uploads/2022/03/DSCF0002.jpg?quality=70&strip=info0',
    title: 'Ford Maverick V8',
  },
  {
    url: 'https://planetcars.com.br/wp-content/uploads/2023/12/karmann-ghia.webp',
    title: 'Volkswagen Karmann-Ghia',
  },
];


