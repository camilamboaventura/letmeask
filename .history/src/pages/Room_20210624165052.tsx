import { Button } from "../components/Button";
import logoImg from "../assets/logo.svg";
import "../styles/room.scss";
import { RoomCode } from "../components/RoomCode";

export function Room() {
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form>
          <textarea placeholder="O que vc quer perguntar?" />
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
