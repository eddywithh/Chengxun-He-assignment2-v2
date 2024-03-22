import React, { useCallback, useRef, useState } from "react";

const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
];

const generateEmptyGrid = (rows, cols) => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        grid.push(Array.from(Array(cols), () => 0));
    }
    return grid;
};


export default function Simulation(){
    const [gridSize, setGridSize] = useState({ rows: 20, cols: 20 });
    const [grid, setGrid] = useState(() => generateEmptyGrid(gridSize.rows, gridSize.cols));
    const [running, setRunning] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [nextStep, setNextStep] = useState(false);

    const runningRef = useRef();
    runningRef.current = running;

    const handleClick = (i, j) => {
        const newGrid = grid.map((row, rowIndex) =>
            row.map((col, colIndex) =>
                rowIndex === i && colIndex === j ? (grid[rowIndex][colIndex] === 1 ? 0 : 1) : grid[rowIndex][colIndex]
            )
        );
        setGrid(newGrid);
    };

    const runSimulation = useCallback(() => {
        if (!runningRef.current && !nextStep) {
            return;
        }

        setGrid(g => {
            const newGrid = [];
            for (let i = 0; i < gridSize.rows; i++) {
                const newRow = [];
                for (let k = 0; k < gridSize.cols; k++) {
                    let neighbors = 0;
                    operations.forEach(([x, y]) => {
                        const newI = i + x;
                        const newK = k + y;
                        if (newI >= 0 && newI < gridSize.rows && newK >= 0 && newK < gridSize.cols) {
                            neighbors += g[newI][newK];
                        }
                    });
                    if (neighbors < 2 || neighbors > 3) {
                        newRow.push(0);
                    } else if (g[i][k] === 0 && neighbors === 3) {
                        newRow.push(1);
                    } else {
                        newRow.push(g[i][k]);
                    }
                }
                newGrid.push(newRow);
            }
            return newGrid;
        });

        if (runningRef.current) {
            setTimeout(runSimulation, 1000);
        }
    }, [gridSize, nextStep]); 

    const handleSizeChange = (e, type) => {
        const value = parseInt(e.target.value);
        setGridSize(prevSize => ({
            ...prevSize,
            [type]: value
        }));
    };

    const handleSizeSubmit = () => {
        if (gridSize.rows < 3 || gridSize.rows > 40 || gridSize.cols < 3 || gridSize.cols > 40) {
            setErrorMessage("Please enter numbers between 3 and 40.");
        } else {
            setGrid(generateEmptyGrid(gridSize.rows, gridSize.cols));
            setErrorMessage("");
            if (running) {
                setRunning(false);
                setTimeout(() => {
                    setRunning(true);
                    runSimulation();
                }, 1000);
            }
        }
    };

    const handleNextStep = () => {
        setNextStep(true);
        runSimulation();
    };

    return (
        <div className="grid-container">
            <div>
                <input type="number" value={gridSize.rows} onChange={(e) => handleSizeChange(e, "rows")} />
                <input type="number" value={gridSize.cols} onChange={(e) => handleSizeChange(e, "cols")} />
                <button onClick={handleSizeSubmit}>Submit</button>
                {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            </div>

            <button onClick={handleNextStep}>Next</button>

            <button
                onClick={() => {
                    setRunning(!running);
                    if (!running) {
                        runningRef.current = true;
                        runSimulation();
                    }
                }}
            >
                {running ? "Stop" : "Start"}
            </button>

            <button
                onClick={() => {
                    const newGrid = generateEmptyGrid(gridSize.rows, gridSize.cols).map(row =>
                        row.map(() => (Math.random() > 0.95 ? 1 : 0))
                    );
                    setGrid(newGrid);
                }}
            >
                Random
            </button>

            <button onClick={() => setGrid(generateEmptyGrid(gridSize.rows, gridSize.cols))}>
                Clear
            </button>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${gridSize.cols}, 20px)`
                }}
            >
                {grid.map((rows, i) =>
                    rows.map((col, j) => (
                        <div
                            key={`${i}-${j}`}
                            onClick={() => handleClick(i, j)}
                            style={{
                                width: 20,
                                height: 20,
                                backgroundColor: grid[i][j] ? "rgb(150, 150, 228)" : undefined,
                                border: "solid 1px black"
                            }}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

