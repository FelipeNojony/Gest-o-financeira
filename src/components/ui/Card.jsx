function Card({ children, className = '', ...rest }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

function Header({ children, className = '', ...rest }) {
  return (
    <div
      className={`flex justify-between items-center mb-4 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

function Title({ children, className = '', ...rest }) {
  return (
    <h3
      className={`text-lg font-semibold text-gray-900 ${className}`}
      {...rest}
    >
      {children}
    </h3>
  );
}

function Content({ children, className = '', ...rest }) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

Card.Header = Header;
Card.Title = Title;
Card.Content = Content;

export default Card;
