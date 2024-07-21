// styles/commonStyles.js
import { styled, Theme } from '@mui/system';
import { Box, Container } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
}));

export const BiographyContainer = styled(Container)(
  ({ theme }: { theme: Theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  })
);

export const AvatarBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    marginBottom: theme.spacing(4),
  },
}));
