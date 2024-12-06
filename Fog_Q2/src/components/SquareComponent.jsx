import styled from 'styled-components';

// Styled component for the square with dynamic color properties
const Square = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${props => props.color}; // Default background color
  margin: 10px;
  transition: background-color 0.3s ease-in-out; // Smooth color transition on hover

  &:hover {
    background-color: ${props => props.hoverColor}; // Hover background color
  }
`;

/**
 * SquareComponent
 * A reusable square component with customizable colors.
 *
 * @param {string} color - Default background color.
 * @param {string} hoverColor - Background color on hover.
 */
const SquareComponent = ({ color, hoverColor }) => {
  return <Square color={color} hoverColor={hoverColor} />;
};

export default SquareComponent;
