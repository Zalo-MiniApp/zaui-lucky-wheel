import Background from "@/components/background";
import Header from "@/components/header";
import { PATHS } from "@/constants/path";
import rewardImg from "@/static/reward.png";
import { useState } from "react";
import { Button, Page, useNavigate } from "zmp-ui";

export default function RewardPage() {
  const [roll] = useState<number>(1);
  const navigate = useNavigate();

  return (
    <Page
      hideScrollbar
      className="relative overflow-y-scroll overflow-x-hidden bg-layer-layer_background_subtle"
    >
      <Background />
      <div className="relative">
        <Header />
        <div className="mx-4 flex items-center h-full">
          <div className="flex flex-col gap-4 items-center mt-20">
            <img src={rewardImg} alt="" />
            <div className="text-xlarge_b">
              Bạn đã nhận được {roll} lượt quay
            </div>
            <div className="text-small whitespace-pre-line text-center">
              {
                "Chúc mừng bạn đã tham gia chương trình vòng quay may mắn thành công và nhận được 1 lượt quay.\n\nVòng quay may mắn với nhiều giải thưởng và Voucher giảm giá hấp dẫn."
              }
            </div>
            <Button
              htmlType="submit"
              className="!bg-button-primary text-white text-normal_m"
              fullWidth
              onClick={() => navigate(PATHS.WHEEL)}
            >
              ĐẾN VÒNG QUAY MAY MẮN
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
}
