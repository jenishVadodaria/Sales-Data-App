import styles from "./companyProfile.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "./swiperCard.scss";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
// import "swiper/react/swiper-react.js";
// import "swiper/swiper.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import userIcon from "../../../assets/user.png";

const CompanyCard = ({ keyMembers, actionComponent, title }: any) => {
  function limit(string = "", limit = 250) {
    return string.substring(0, limit);
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalName, setModalName] = useState("");

  function openModal(content: any, title: any, name: any) {
    setModalContent(content);
    setModalIsOpen(true);
    setModalTitle(title);
    setModalName(name);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const dummyInfo = [
    {
      name: "John Doe",
      position: "Developer",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Jane Smith",
      position: "Designer",
      desc: "Nulla nec lorem sit amet est faucibus scelerisque.",
    },
  ];

  return (
    <>
      <div className={styles.card + " mx-2"}>
        <div className={styles.cardHeader}>
          <h4 className={styles.cardTitle} key="containerCardTitle">
            {title}
          </h4>
          {actionComponent}
        </div>
        {/* <Swiper navigation={true} modules={[Navigation]} className="topSwiper"> */}
        <Swiper navigation={true} modules={[Navigation]} className="topSwiper">
          {keyMembers &&
            keyMembers.map((item: any, index: any) => (
              <SwiperSlide key={index}>
                <div className={styles.cardHeight}>
                  <div className="text-dark my-4">
                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="w-25 my-1 text-start">
                          <div>
                            <img
                              width="50px"
                              height={"50px"}
                              src={item.imageUrl ? item.imageUrl : userIcon}
                              className={styles.imageR}
                            />
                            <div>
                              <h3 className="my-2 fs-6 fw-bold">{item.name}</h3>
                              <p
                                className={
                                  styles.subheading +
                                  " text-secondary my-2 lh-base"
                                }
                              >
                                {item.position}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-75 fs-6 mx-2 lh-base">
                          {item.information.length > 250
                            ? limit(item.information) + "... "
                            : item.information}
                          {item.information.length > 250 && (
                            <span
                              className="text-blue-600 cursor-pointer"
                              style={{ color: "#0c6efd" }}
                              onClick={() =>
                                openModal(
                                  item.information,
                                  item.position,
                                  item.name
                                )
                              }
                            >
                              Read More
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <Modal
        {...keyMembers}
        size="lg"
        show={modalIsOpen}
        onHide={closeModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modalName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="fs-5 leading-6"> {modalTitle}</h4>
          <br></br>
          <p>{modalContent}</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            style={{
              backgroundColor: "#0c6efd",
              color: "white",
              border: "none",
            }}
            className="btn btn-primary"
            onClick={closeModal}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CompanyCard;
