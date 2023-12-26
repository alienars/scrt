

interface FeaturesLargeProps {
  title: string;
  desc: string;
  color: string;
  children: any;
}


 
const FeaturesLarge: React.FC<FeaturesLargeProps> = ({title,desc,color,children}) => {
    return (
      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div
          className="w-20 h-20 inline-flex items-center justify-center rounded-full text-indigo-500 mb-5 flex-shrink-0 bg-gray-700"
          style={{ color: color }}
        >
          {children}
        </div>
        <div className="flex-grow">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-3" style={{ color: color }}>
            {title}
          </h2>
          <p className="leading-relaxed text-base">
            {desc}
          </p>
        </div>
      </div>
    );
}
 
export default FeaturesLarge;