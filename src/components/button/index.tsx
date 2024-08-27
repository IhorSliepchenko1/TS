import style from "./index.module.scss";

type Props = {
    number: number | string;
    onClick: () => void;
    disabled: boolean;
    page?: number;
};

const Button = ({number, onClick, disabled, page}: Props) => {
    return (
        <button
            className={style.button}
            onClick={() => onClick()}
            disabled={disabled}
            style={{
                background:
                    page === number && true
                        ? `green`
                        : `rgba(1, 96, 151, 0.735)`,
            }}
        >
            {number}
        </button>
    );
};

export default Button;
