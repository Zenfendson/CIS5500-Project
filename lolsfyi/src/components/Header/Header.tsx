import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
import { useMediaQuery } from '@mui/material';

const pages = ['Match', 'Stats', 'Player', 'Team'];
export type HeaderProps = {
  ColorModeContext: React.Context<{ toggleColorMode: () => void }>;
};

function Header(props: HeaderProps) {
  const { ColorModeContext } = props;
  const router = useRouter()

  const handleNavigate = (event: React.MouseEvent<HTMLElement>) => {
    router.push(`/${event.currentTarget.textContent?.toLowerCase()}`)
  };

  const tabletCheck = useMediaQuery("(min-width: 768px)");

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LoLs.FYI
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LoLs.FYI
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleNavigate}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {tabletCheck && <ThemeToggleButton ColorModeContext={ColorModeContext} />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;