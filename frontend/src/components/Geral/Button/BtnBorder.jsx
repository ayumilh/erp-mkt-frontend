import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';

export const BtnBorder = ({title}) => {
  return (
    <div>
      <button
        aria-haspopup="true"
        className="w-full h-8 px-2 my-1 flex items-center justify-start md:justify-center md:rounded-lg md:border border-gray-200 dark:md:border-neutral-700 hover:border-[#c7c7c7] focus:outline-none focus:ring-1 focus:ring-[#d4d4d4]"
      >
        {title === "Filtrar" ? (
            <FilterListIcon sx={{ fontSize: '18px' }} className="mr-2 dark:text-gray-300 dark:hover:text-white" />
        ) : (
            <EditIcon sx={{ fontSize: '18px' }} className="mr-2 dark:text-gray-300 dark:hover:text-white" />
        )}
        <span className="text-neutral-700 dark:text-gray-300 dark:hover:text-white hover:text-black text-sm font-medium">
          {title}
        </span>
      </button>
    </div>
  );
}
