import { useState } from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import ReactDOM from "react-dom";
import NavBar from "./NavBar";
import BackgroundModal from "../ui/BackgroundModal";
import Modal from "../ui/Modal";
const Home = () => {
  const [showModal, setShowModal] = useState(null);

  const onSetShowModalHandler = (id) => {
    setShowModal(id);
  };

  const onSetHideModalHandler = () => {
    setShowModal(null);
  };
  return (
    <>
      <NavBar />
      <Menu onSetShowModal={onSetShowModalHandler} />
      <Footer />
      {showModal &&
        ReactDOM.createPortal(
          <Modal
            showModalId={showModal}
            onSetHideModal={onSetHideModalHandler}
          />,
          document.getElementById("modal")
        )}
      {showModal &&
        ReactDOM.createPortal(
          <BackgroundModal />,
          document.getElementById("modal")
        )}
    </>
  );
};
export default Home;
