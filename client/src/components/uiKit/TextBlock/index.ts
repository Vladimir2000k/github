import styled from 'styled-components';

export enum TEXT_BLOCK_TYPE {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P1,
  P2,
  P3,
  P4,
  P5,
  P6,
  P7,
  ERROR,
}

const TextBlock = styled.div<{type: TEXT_BLOCK_TYPE}>(({type, theme}) => {
  let fontSize;
  let fontWeight;
  let lineHeight = 400;
  let color;

  switch (type) {
    case TEXT_BLOCK_TYPE.H1:
      fontWeight = 800;
      fontSize = 40;
      lineHeight = 64;
      color = theme.colors.primary;
      break;
    case TEXT_BLOCK_TYPE.H2:
      fontWeight = 800;
      fontSize = 35;
      lineHeight = 50;
      color = theme.colors.primary;
      break;
    case TEXT_BLOCK_TYPE.H3:
      fontWeight = 800;
      fontSize = 24;
      lineHeight = 32;
      color = theme.colors.primary;
      break;
    case TEXT_BLOCK_TYPE.H4:
      fontWeight = 800;
      fontSize = 20;
      lineHeight = 28;
      color = theme.colors.black;
      break;
    case TEXT_BLOCK_TYPE.H5:
      fontWeight = 700;
      fontSize = 26;
      lineHeight = 33;
      color = theme.colors.grey20;
      break;
    case TEXT_BLOCK_TYPE.P1:
      fontWeight = 700;
      fontSize = 20;
      lineHeight = 30;
      color = theme.colors.grey27;
      break;
    case TEXT_BLOCK_TYPE.P2:
      fontWeight = 700;
      fontSize = 18;
      lineHeight = 30;
      color = theme.colors.blueishGrey43;
      break;
    case TEXT_BLOCK_TYPE.P3:
      fontWeight = 600;
      fontSize = 20;
      lineHeight = 26;
      color = theme.colors.grey27;
      break;
    case TEXT_BLOCK_TYPE.P4:
      fontWeight = 500;
      fontSize = 18;
      lineHeight = 20;
      color = theme.colors.grey27;
      break;
    case TEXT_BLOCK_TYPE.P5:
      fontWeight = 400;
      fontSize = 18;
      lineHeight = 24;
      color = theme.colors.blueishGrey43;
      break;
    case TEXT_BLOCK_TYPE.P6:
      fontWeight = 400;
      fontSize = 16;
      lineHeight = 26;
      color = theme.colors.grey27;
      break;
    case TEXT_BLOCK_TYPE.P7:
      fontWeight = 400;
      fontSize = 14;
      lineHeight = 24;
      color = theme.colors.black;
      break;
    case TEXT_BLOCK_TYPE.ERROR:
      fontWeight = 'normal';
      fontSize = 12;
      lineHeight = 16;
      color = theme.colors.error;
  }

  return `
      font-size: ${fontSize}px;
      font-weight: ${fontWeight};
      line-height: ${lineHeight}px;
      color: ${color};
    `;
});

export default TextBlock;
