import React from 'react';
import './Home.css';


function Home(){
    return (
        <>
        <div className="Home">
            <h1 className="title-home"> Welcome to the Game of Life! ◡̈ </h1>
            <ul className="game-rules"> Here are the 4 rules to the game:</ul>
                <li className>A living cell with less than 2 living neighbors dies.</li>
                <li>A living cell with 2 or 3 live neighbors lives. </li>
                <li>A living cell with more than 3 live neighbors dies.</li>
                <li>A dead cell with exactly 3 live neighbors becomes a live cell, as if by reproduction.</li>
        </div>
        </>
    );
}

export default Home;