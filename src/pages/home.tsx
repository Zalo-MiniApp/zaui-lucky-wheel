import Background from "@/components/background";
import Header from "@/components/header";
import { Page, Swiper } from "zmp-ui";

import RegisterForm from "@/components/register-form";
import slideImg from "@/static/slide-img.png";
import { usePermissionStore } from "@/stores/permission";
import { useEffect } from "react";

export default function HomePage() {
  const { check: checkPermission } = usePermissionStore();

  useEffect(() => {
    checkPermission();
  }, []);

  return (
    <Page
      hideScrollbar
      className="relative overflow-y-scroll overflow-x-hidden bg-layer-layer_background_subtle"
    >
      <Background />
      <div className="relative">
        <Header />
        <div className="mx-4">
          <Swiper autoplay loop className="">
            <Swiper.Slide>
              <img src={slideImg} alt="" />
            </Swiper.Slide>
            <Swiper.Slide>
              <img src={slideImg} alt="" />
            </Swiper.Slide>
          </Swiper>
        </div>
        <RegisterForm />
      </div>
    </Page>
  );
}
