import "./css/Button1.css";
interface props {
  id?: string;
  name?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}
function Button1({ name, id, children, onClick }: props) {
  return (
    <div id={id} onClick={onClick}>
      {name}
      {children}
    </div>
  );
}

export default Button1;
