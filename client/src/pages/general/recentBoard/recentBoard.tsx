// import Carousel from 'react-bootstrap/Carousel'
import RecentCard from "./recentCard";
// import bg1 from '../../../../../assets/img/bg1.png'
// import bg2 from '../../../../../assets/img/bg2.png'
// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";

// Import Swiper styles
// import 'swiper/swiper.min.css'
// import 'swiper/components/pagination/pagination.scss'
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
// import "swiper/react/swiper-react.js";
// import "swiper/swiper.min.css";
// import "swiper/modules/pagination/pagination.scss";
// import 'swiper/modules/navigation/navigation.scss';
// import "swiper/modules/scrollbar/scrollbar.scss";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

import "./boardSwiper.scss";
// import bg3 from '../../../../../assets/img/bg3.png'
import Recent_Boards_1 from "../../../assets/Recent_Boards_1.png";
import Recent_Boards_2 from "../../../assets/Recent_Boards_2.png";
import Recent_Boards_3 from "../../../assets/Recent_Boards_3.png";

function RecentBoard({ recentBoardAnnouncement }: any) {
  const announcementsTest =
    recentBoardAnnouncement &&
    recentBoardAnnouncement.map((announcement: string, index: number) => ({
      image:
        index % 3 === 0
          ? Recent_Boards_1
          : index % 3 === 1
          ? Recent_Boards_2
          : Recent_Boards_3,
      title: announcement,
      content: announcement,
    }));

  return (
    <div className="my-5">
      <div className="text-center">
        <h2 className="text-dark fw-bold fs-3 my-5">
          Recent board announcements
        </h2>
      </div>
      <Swiper
        slidesPerView={3}
        navigation={true}
        modules={[Navigation]}
        className="boardSwiper px-3"
      >
        {/* {announcements?.announcements.map((item: any) => ( */}
        {announcementsTest &&
          announcementsTest.map((item: any) => (
            <SwiperSlide className="gap-1">
              <RecentCard
                title={item.title}
                image={item.image}
                para={item.content}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default RecentBoard;
