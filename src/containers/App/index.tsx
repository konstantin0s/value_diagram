import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '../../styles/globalStyles';
import { DiagramContainer } from '../DiagramContainer';
import { Header } from '../../components/Header';
import { Container } from './styled';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import { StatusContainer } from '../../components/Dropdown/styled';
import { useSelector } from 'react-redux';
import { loadingStatusSelector } from './selectors';

export const App = () => {
  const saveStatus = useSelector(loadingStatusSelector);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header />
        <StatusContainer>
          {saveStatus === 'saving' ? (
            <CircularProgress
              color='primary'
              thickness={4}
              style={{ zIndex: 100 }}
              size='4rem'
            />
          ) : (
            <CheckCircleOutlineIcon
              id='saved'
              color='success'
              fontSize='large'
            />
          )}
        </StatusContainer>
        <DiagramContainer />
      </Container>
      <GlobalStyle />
    </ThemeProvider>
  );
};
