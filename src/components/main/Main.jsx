import CartButton from "../header/CartButton";
import Header from "../header/Header";
import SearchBar from "../header/SearchBar";
import LabTabs from "./LabTabs";

export default function Main() {
  return (
    <>
      <Header>
        <SearchBar />
        <CartButton />
      </Header>

      <main>
        <LabTabs />
      </main>
    </>
  );
}
