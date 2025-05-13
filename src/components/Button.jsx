const Button = ({ color, children }) => {
  const colors = {
    primary: "bg-primary-blue-800 text-white hover:bg-primary-blue-700",
    secondary:
      "bg-primary-blue-800/10 text-primary-blue-800 hover:bg-primary-blue-700/10",
  };

  return <button className={`${colors[color]}`}>{children}</button>;
};

export default Button;