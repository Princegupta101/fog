import React, { useEffect, useState, useRef } from 'react';

import '../App.css';

const Grid = ({ rows, cols }) => {
  const [grid, setGrid] = useState([]); // State to manage the grid
  const dropsRef = useRef([]); // Ref to track raindrop positions
  const [currentColor, setCurrentColor] = useState('red'); // Current rain color
  const [colorChangeInterval, setColorChangeInterval] = useState(2000); // Interval for color change
  const [colorChangeCount, setColorChangeCount] = useState(0); // Count for color changes

  // Initialize the grid
  useEffect(() => {
    const createGrid = () => {
      let newGrid = [];
      for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
          row.push({ color: 'black' }); // Default cell color
        }
        newGrid.push(row);
      }
      setGrid(newGrid);
    };

    createGrid();
  }, [rows, cols]);

  // Handle raindrop movement
  useEffect(() => {
    const dropRain = () => {
      setGrid(prevGrid => {
        // Reset grid colors
        let newGrid = prevGrid.map(row => row.map(cell => ({ ...cell, color: 'black' })));

        // Move existing drops downward
        for (let i = dropsRef.current.length - 1; i >= 0; i--) {
          const drop = dropsRef.current[i];
          if (drop.row < rows - 1) {
            newGrid[drop.row][drop.col].color = 'black'; // Clear previous position
            drop.row++;
            newGrid[drop.row][drop.col].color = drop.color; // Update new position
          } else {
            dropsRef.current.splice(i, 1); // Remove drops that reach the bottom
          }
        }

        // Add new drops if needed
        if (dropsRef.current.every(drop => drop.row > 0) || dropsRef.current.length === 0) {
          const randomCol = Math.floor(Math.random() * cols); // Random column for new drop
          for (let i = 0; i < 6; i++) {
            const colorDensity = i / 6; // Gradient effect
            const dropColor = `rgba(${Math.floor(colorDensity * 255)}, ${Math.floor(colorDensity * 255)}, ${Math.floor(colorDensity * 255)}, ${colorDensity})`;
            newGrid[i][randomCol].color = dropColor;
            dropsRef.current.push({ row: i, col: randomCol, color: dropColor }); // Add new drop
          }
        }

        return newGrid;
      });
    };

    const interval = setInterval(dropRain, 200); // Raindrop animation interval
    return () => clearInterval(interval);
  }, [rows, cols, currentColor]);

  // Periodically change raindrop color
  useEffect(() => {
    const changeColorInterval = setInterval(() => {
      const newColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
      setCurrentColor(newColor); // Update to a new random color
      setColorChangeCount(colorChangeCount + 1); // Increment color change count
    }, colorChangeInterval);

    return () => clearInterval(changeColorInterval);
  }, [colorChangeInterval]);

  return (
    <div className="grid">
      {/* Render the grid */}
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className="cell" style={{ backgroundColor: cell.color }}></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
