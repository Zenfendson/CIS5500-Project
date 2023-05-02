import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
import { useMediaQuery } from '@mui/material';
import { LOL_ESPORTS } from '@/constants';
import Image from 'next/image';

const pages = ['Matches', 'Stats', 'Player', 'Team'];
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
          <Image src={LOL_ESPORTS} alt="LoL" width={120} height={64} onClick={(event) => router.push(`/`)}/>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', marginLeft: '20px'} }}>
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