const ErrorMessage = ({ error }: { error: string | null }) => {
  return <div style={{ color: `red` }}>{error}</div>;
};

export default ErrorMessage;
