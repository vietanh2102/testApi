import { FC } from "react";
import { NavLink } from "react-router-dom";
interface Props {
  path: string;
  title: string;
  setBar?: (value: React.SetStateAction<boolean>) => void;
}
const Path: FC<Props> = ({ path, title, setBar }) => {
  const handleClickPath = () => {
    if (setBar) {
      setBar(false);
    }
  };
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `text-[18px]  ${
          isActive ? "text-blue-500" : "text-[#444444]"
        } font-bold leading-5 block pl-[16px] py-[12px] border-b md:border-none hover:text-blue-500`
      }
      onClick={handleClickPath}
    >
      {title}
    </NavLink>
  );
};

export default Path;
