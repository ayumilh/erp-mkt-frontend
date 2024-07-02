const SkeletonLoader = ({numColumns}) => {
  return (<>
    {Array.from({ length: 3 }).map((_, i) => (
      <tr key={i} className="animate-pulse bg-slate-200 h-8 rounded-full">
        {Array.from({ length: numColumns }).map((_, j) => (
          <td key={j} className="w-24"></td>
        ))}
      </tr>
    ))}
  </>);
};

export default SkeletonLoader;