import Carousel from "react-bootstrap/Carousel";
import FocusAreaCard from "./focusAreaCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import { ifSelected, selectData } from "../../../utils/dataSelection";

const FocusArea = ({ strategicFocusAreas, selectedData }: any) => {
  const [isChecked, setIsChecked] = useState(false);

  const focusAreaDataTest = {
    focusArea: [
      {
        title: "Digital Business",
        content:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed numquam dolores ipsum ab, dolorem provident at, natus magnam harum iure tempore dolore voluptatibus aperiam autem adipisci. Tenetur at minus laborum.",
      },
      {
        title: "Digital Business2",
        content:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed numquam dolores ipsum ab, dolorem provident at, natus magnam harum iure tempore dolore voluptatibus aperiam autem adipisci. Tenetur at minus laborum.",
      },
      {
        title: "Digital Business3",
        content:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed numquam dolores ipsum ab, dolorem provident at, natus magnam harum iure tempore dolore voluptatibus aperiam autem adipisci. Tenetur at minus laborum.",
      },
      {
        title: "Digital Business4",
        content:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed numquam dolores ipsum ab, dolorem provident at, natus magnam harum iure tempore dolore voluptatibus aperiam autem adipisci. Tenetur at minus laborum.",
      },
      {
        title: "Digital Business5",
        content:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed numquam dolores ipsum ab, dolorem provident at, natus magnam harum iure tempore dolore voluptatibus aperiam autem adipisci. Tenetur at minus laborum.",
      },
    ],
  };

  useEffect(() => {
    setIsChecked(ifSelected("strategicFocusAreas"));
  }, [selectedData]);

  return (
    <>
      <div className="text-dark my-4">
        <div className="text-start mx-3 px-2 flex align-items-center mt-5 mb-2">
          <h2 className="text-dark fw-bold fs-3 ">Strategic focus areas</h2>
          <Checkbox
            checked={isChecked}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
            onChange={(e) => {
              setIsChecked(
                selectData("strategicFocusAreas", strategicFocusAreas)
              );
            }}
          />
          {/* <p className="fs-6 text-secondary my-3">
            {/* T-Mobile has a number of strategic focus areas as it seeks to grow
            its business and deliver high-quality products and services to its
            customers. 
          </p> */}
        </div>
        <div className="my-2 d-flex mx-3">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="topSwiper"
            slidesPerView={3}
          >
            {strategicFocusAreas &&
              strategicFocusAreas.map((item: any, index: any) => (
                <SwiperSlide key={index}>
                  <div className="my-2">
                    <div className="text-dark my-4">
                      <div className="my-2 d-flex">
                        <FocusAreaCard
                          title={item.title}
                          content={item.content}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default FocusArea;
