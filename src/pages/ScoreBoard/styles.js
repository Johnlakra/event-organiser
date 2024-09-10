import styled from "styled-components";

export const Wrapper = styled.div`
  width: 800px;
`;

export const Item = styled.div`
  margin: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;

  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
`;

export const Label = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Header = styled.h1`
  text-align: center;
`;

export const Collapsible = styled.p`
  cursor: pointer;
  justify-content: center;
`;

export const Paragraph = styled.p`
  justify-self: center;
`;

export const Event = styled.div``;

export const Divider = styled.div`
  border-bottom-width: 0.5px;
  border-bottom-color: #000;
  border-bottom-style: solid;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 100px 50px 100px;
  column-gap: 200px;
  justify-content: center;
`;
