import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import logoImg from "../assets/logo.svg";
import "../styles/room.scss";
import { RoomCode } from "../components/RoomCode";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");

  const roomId = params.id;

  async function handleSendQuestion() {
    if (newQuestion.trim() === "") {
      return;
    }
    if (!user) {
      throw new Error("you must be logged in");
    }

    const question = {
      content = newQuestion,
      author: {
        name: user?.name,
      },
    };
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form>
          <textarea
            placeholder="O que vc quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            <span>
              Para enviar pergunta, <button>faça seu login</button>.
            </span>
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
