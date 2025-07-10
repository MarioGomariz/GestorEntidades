import { Box, Card, CardContent, CardActionArea, Typography, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

export default function Home() {
    const navigate = useNavigate();
    
    return (
        <Container maxWidth="md" sx={{ mt: 16 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Parcial Mario Gomariz
            </Typography>
            
            <Grid container spacing={4} sx={{ mt: 8, alignItems: 'center', justifyContent: 'center'}}>
                <Grid item xs={12} md={6}>
                    <Card 
                        elevation={3} 
                        sx={{ 
                            height: '100%', 
                            width: '400px',
                            display: 'flex', 
                            flexDirection: 'column',
                            transition: '0.3s',
                            '&:hover': { transform: 'scale(1.03)' }
                        }}
                    >
                        <CardActionArea 
                            onClick={() => navigate('/libros')} 
                            sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}
                        >
                            <MenuBookIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" align="center">
                                    Libros
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    Gestiona los libros 
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <Card 
                        elevation={3} 
                        sx={{ 
                            height: '100%', 
                            width: '400px',
                            display: 'flex', 
                            flexDirection: 'column',
                            transition: '0.3s',
                            '&:hover': { transform: 'scale(1.03)' }
                        }}
                    >
                        <CardActionArea 
                            onClick={() => navigate('/bibliotecas')} 
                            sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}
                        >
                            <LocalLibraryIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" align="center">
                                    Bibliotecas
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align="center">
                                    Gestiona las bibliotecas
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}