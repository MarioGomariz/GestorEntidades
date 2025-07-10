import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Parcial Mario Gomariz
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Button color="inherit" component={RouterLink} to="/">
                        Inicio
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/libros">
                        Libros
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/bibliotecas">
                        Bibliotecas
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}