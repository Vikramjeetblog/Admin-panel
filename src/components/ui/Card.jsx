const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      {...props}
      className={`
        rounded-2xl 
        border border-gray-200
        bg-white
        
        transition-all duration-200
        
        hover:border-black
        
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;