import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";
import { FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";

import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss";
import { database } from "../services/firebase";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");
  //vai criar a sala
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }
    //dentro do meu banco de dados vou ter uma separaçao em "rooms"
    const roomRef = database.ref("rooms");
    //dentro de rooms eu faço um push - estou jogando uma nova sala em "rooms"
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id, //vem com a ? porque no primeiro momento o usuário nao está logado
    });

    history.push(`/rooms/${firebaseRoom.key}`);
    //key é a ID de registro de quando a sala é criada
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
