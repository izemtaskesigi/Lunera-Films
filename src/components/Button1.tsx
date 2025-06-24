import "./Button1.css";
interface props {
  onClick: () => void;
  id?: string;
  name: string;
}
function Button1({ name, id, onClick }: props) {
  return (
    <button onClick={onClick} id={id}>
      {name}
    </button>
  );
}

export default Button1;
