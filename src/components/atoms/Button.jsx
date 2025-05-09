const Button = ({ children, onClick, className = "" }) => (
  <button
    className={`rounded-md py-2 px-4 border border-transparent text-center text-sm text-primary transition-all shadow-md hover:shadow-lg active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-primary font-semibold cursor-pointer ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
