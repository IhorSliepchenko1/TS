import style from "./index.module.scss";

type Props = {
  number: number | string;
  onClick: () => void;
  disabled: boolean;
};

const Button = ({ number, onClick, disabled }: Props) => {
  return (
    <button
      className={style.button}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {number}
    </button>
  );
};

export default Button;
