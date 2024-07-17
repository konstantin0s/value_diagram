import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 14px;
  color: white;
  text-align: center;
  height: 80px;
`;

const H2Container = styled.header`
  padding: 0;
  margin: 7px 0;
  text-align: center;
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <H2Container>ValueBlue - Diagram</H2Container>
    </HeaderContainer>
  );
};
