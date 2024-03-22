import "./Header.css"

export default function Header(){
    return (
        <nav className="nav">
            <a href="/" className="title">
                Conway's Game of Life
            </a>
            <ul>
                <li> <a href="/home">Home</a></li>
                <li> <a href="/simulation">Simulation</a></li>
                <li> <a href="/credits">Credits</a></li>
            </ul>
        </nav>
    )
}