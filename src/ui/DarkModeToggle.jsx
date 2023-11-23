import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../contexts/DarkModeContext";
export default function DarkModeToggle() {
  const { isDarkMode, toggleMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
