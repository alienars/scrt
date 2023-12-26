interface FeaturesLargeProps {
  text: string;
  children: any;
}

const FeaturesLarge: React.FC<FeaturesLargeProps> = ({ text, children }) => {
  return (
    <div className="p-2 sm:w-1/2 w-full">
      <div className="bg-gray-700 rounded flex p-4 h-full items-center text-gray-900 hover:text-indigo-500 transition ease-in-out">
        {children}
        <span className="title-font font-medium">{text}</span>
      </div>
    </div>
  );
};

export default FeaturesLarge;
