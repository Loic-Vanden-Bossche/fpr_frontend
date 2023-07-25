import { useEffect, useState } from "react";
import { gamesResultContainer, gamesResultImage } from "../../ui/games.ts";
import { Button, colors, outPrimaryShadow } from "../../ui";
import { Icon, icons } from "../../lib";
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti';

interface GameResultProps {
  isWin: boolean;
}

interface GiphyResponse {
    data: {
        images: {
            original: {
                webp: string;
            }
        }
    }
}

export function GameResult({ isWin }: GameResultProps) {
  const [data, setData] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=Fymirmxihj21o2a4mGSwlzJgKlVycgg4&rating=G&tag=${isWin ? "win" : "bad wrong"}`)
      .then((res) => res.json()).then((data: GiphyResponse) => {
        setData(data.data.images.original.webp);
      });
  }, [isWin]);

  const handleLogoClick = () => navigate("/");

  return (<>
    <div css={gamesResultContainer}>
      <img css={gamesResultImage} src={data} />
      <div className="">
        <h1 className="">
          {isWin ? "You win!" : "You lose!"}
        </h1>
        <h2 className="">
          {isWin ? "Congratulations!" : "Better luck next time!"}
        </h2>
        <Button background={colors.white} color={colors.primary} shadow={outPrimaryShadow} onClick={handleLogoClick}>
          <Icon icon={icons.home} color={colors.primary}/>
          Return to menu
        </Button>
      </div>
    </div>
    {isWin && <Confetti
      style={{
        height: '100vh',
        width: '100vw'
      }}
      width={window.outerWidth}
      height={window.outerHeight}
    />}
  </>
  );
}
