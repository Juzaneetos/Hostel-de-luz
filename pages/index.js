import Image from 'next/image'
import Link from 'next/link'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import useSwr from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {

  // const { data: banners } = useSwr(`/api/banners/getAllBanners`, fetcher);
  // const { data: subBanners } = useSwr(`/api/subBanners/getAllSubBanner`, fetcher);
  // const { data: promotions } = useSwr(`/api/promotions/getAllPromotions`, fetcher);
  // const { data: colors } = useSwr(`/api/colors/getAllColor`, fetcher);
  // const { data: sizes } = useSwr(`/api/product_sizes/getAllSizes`, fetcher);
  // const { data: mainCategories } = useSwr(`/api/category/getAllCategory`, fetcher);
  // const { data: products } = useSwr(`/api/products/getAllProducts`, fetcher);

  return (
    <>
      {/* <!-- ec Banner Slider --> */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop={true}
        pagination={true}
        autoplay={{ delay: 5000 }}>
            <SwiperSlide>
              <div style={{ position: 'absolute', width: '100%', background: 'black' }}>
              </div>
            </SwiperSlide>
      </Swiper>


    </>
  );
}
