import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./companyProfile.module.scss";
import copyIcon from "../../../assets/copyIcon.png";
import emailIcon from "../../../assets/emailIcon.png";
import pinIcon from "../../../assets/pinIcon.png";

import CompanyCard from "./companyCard";
import ContainerCard from "../../../components/containerCard/containerCard";
import { Checkbox } from "@mui/material";
import { ifSelected, selectData } from "../../../utils/dataSelection";

const CompanyProfile = ({
  profile,
  headquarter,
  email,
  website,
  keyMembers,
  selectedData,
}: any) => {
  function limit(string = "", limit = 250) {
    return string.substring(0, limit) + "...";
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedKeymembers, setIsCheckedKeymembers] = useState(false);

  function openModal(content: any) {
    setModalContent(content);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    setIsChecked(ifSelected("profile"));
    setIsCheckedKeymembers(ifSelected("keyMembers"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedData]);

  return (
    <>
      <div className="my-5">
        <div className="d-flex gap-1">
          <ContainerCard
            isLoading={false}
            children={
              <div className="my-3">
                <p className="my-2 fs-6 lh-base">
                  {profile?.length > 250 ? limit(profile) + "  " : profile}
                  {profile?.length > 250 && (
                    <span
                      className=" text-blue-600 cursor-pointer"
                      style={{ color: "#0c6efd" }}
                      onClick={() => openModal(profile)}
                    >
                      Read More
                    </span>
                  )}
                </p>
                <div className="d-flex my-4 justify-content-between align-items-center text-primary">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={<Tooltip id={`tooltip-top`}>{website}</Tooltip>}
                  >
                    <a
                      className="text-decoration-none cursor-pointer"
                      onClick={() => {
                        window.open(`https://${website}`);
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <img width="20px" src={copyIcon} />
                        <span
                          style={{ width: "150px" }}
                          className="mx-2 d-inline-block text-truncate"
                        >
                          {website}
                        </span>
                      </div>
                    </a>
                  </OverlayTrigger>

                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-top`}>{headquarter}</Tooltip>
                    }
                  >
                    <a className="text-decoration-none cursor-pointer">
                      <div className="d-flex align-items-center">
                        <img width="20px" src={pinIcon} />
                        <span
                          style={{ width: "150px" }}
                          className="mx-2 d-inline-block text-truncate"
                        >
                          {headquarter}
                        </span>
                      </div>
                    </a>
                  </OverlayTrigger>
                  {email !== "" && (
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={<Tooltip id={`tooltip-top`}>{email}</Tooltip>}
                    >
                      <a className="text-decoration-none cursor-pointer">
                        <div className="d-flex align-items-center">
                          <img width="20px" src={emailIcon} />
                          <span
                            style={{ width: "150px" }}
                            className="mx-2 d-inline-block text-truncate"
                          >
                            {email}
                          </span>
                        </div>
                      </a>
                    </OverlayTrigger>
                  )}
                </div>
              </div>
            }
            title="Company Profile"
            className={styles.subheading + " w-50 mx-2"}
            actionComponent={
              <Checkbox
                checked={isChecked}
                onChange={(e) => {
                  setIsChecked(selectData("profile", profile));
                }}
              />
            }
          />
          <Modal
            size="lg"
            show={modalIsOpen}
            onHide={closeModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                More about the Company
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <h4 className='fs-5 leading-6'> More about the Company</h4> */}
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
          <CompanyCard
            keyMembers={keyMembers}
            title="Key Members"
            actionComponent={
              <Checkbox
                checked={isCheckedKeymembers}
                onChange={(e) => {
                  setIsCheckedKeymembers(selectData("keyMembers", keyMembers));
                }}
              />
            }
          />
        </div>
      </div>
    </>
  );
};
export default CompanyProfile;
