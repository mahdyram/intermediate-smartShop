import Logo from "./Logo";
import CartButton from "./CartButton";

export default function Header({ children }) {
  return (
    <header>
      <Logo />
      {children}
    </header>
  );
}
