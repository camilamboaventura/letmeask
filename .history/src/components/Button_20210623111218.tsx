import { ButtonHTMLAttributes } from "react";
import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <button className="button" {...props} />;
}

//todas as propriedades do componente Button sao passadas para a taga button atraves de props. Todas as propriedades vem do ButtomHTMLAtributes que pertence ao React.
