import { startScreen } from "./Game.style";

interface Props{
  isStarted: boolean;
  handleStartClick: () => void;
}

export function GameStartScreen({ isStarted, handleStartClick }: Props) {
  return <>
    <section css={startScreen}>
      <p>{isStarted ? "Your game is loading" : "Your game is waiting to be started"}</p>
      {isStarted ?
        <div className="loader">
          <p>.</p>
          <p>.</p>
          <p>.</p>
        </div> :
        <button onClick={handleStartClick}>Start game</button>
      }
      <div className="veil" />
    </section>
  </>;
}
