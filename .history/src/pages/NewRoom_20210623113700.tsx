import { useState } from "react";
import { Link } from "react-router-dom";
//import { AuthContext } from "../contexts/AuthContext";
import { FormEvent } from "react";

import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";

export function NewRoom() {
  //const { user } = useAuth();

  const [newRoom, setNewRoom] = useState("");
  //vai criar a sala
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    console.log(NewRoom);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustraçao de perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />

          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
