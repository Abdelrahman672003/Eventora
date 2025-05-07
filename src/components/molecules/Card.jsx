const Card = ({ title, content }) => {
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Card;
