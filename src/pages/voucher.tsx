import Background from "@/components/background";
import Header from "@/components/header";
import VoucherCard from "@/components/voucher-card";
import VoucherRibbonImg from "@/static/voucher-ribbon.png";
import { useEffect, useState } from "react";
import { showOAWidget } from "zmp-sdk/apis";
import { Button, Modal, Page } from "zmp-ui";

export default function VoucherPage() {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    showOAWidget({
      id: "oaWidget",
      guidingText: "Nhận thông báo khuyến mãi mới nhất từ cửa hàng",
      color: "#0068FF",
      onStatusChange: (status) => {
        console.log(status);
      },
    });
  }, []);

  return (
    <Page
      hideScrollbar
      className="relative overflow-y-scroll overflow-x-hidden bg-layer-layer_background_subtle"
    >
      <Background />
      <img
        src={VoucherRibbonImg}
        alt=""
        className="absolute top-0 h-full object-cover opacity-50"
      />
      <div className="relative">
        <Header />
        <div className="mx-4 flex items-center flex-col justify-center h-full mt-20 relative z-10">
          <div className="flex flex-col gap-4 items-center mb-8">
            <div className="text-xlarge_b">CHÚC MỪNG!!</div>
            <div className="text-small whitespace-pre-line text-center">
              Bạn đã nhận được Voucher may mắn
            </div>
          </div>

          <VoucherCard />

          <div className="flex flex-col gap-4 items-center mt-10">
            <div className="text-xlarge_b">Voucher may mắn 500.000đ</div>
            <div className="text-small whitespace-pre-line text-center">
              {
                "Gift Voucher 500k · Gift Voucher giảm giá 300.000 vnd · Dùng để mua ống kính Viltrox, 7Artisans\n\nChỉ sử dụng 1 lần trong năm 2021-2022"
              }
            </div>
          </div>
          <Button
            htmlType="submit"
            className="!bg-button-primary text-white text-normal_m my-16"
            fullWidth
            onClick={() => setVisible(true)}
          >
            THEO DÕI OA BIGG
          </Button>
          <Modal
            visible={visible}
            onClose={() => setVisible(false)}
            actions={[
              {
                text: "Không quan tâm",
                close: true,
              },
              {
                close: true,
                highLight: true,
                text: "Tìm hiểu thêm",
              },
            ]}
          >
            <div id="oaWidget" />
          </Modal>
        </div>
        <div className="absolute inset-x-0 -bottom-16 h-full bg-white rounded-full blur-3xl z-0"></div>
      </div>
    </Page>
  );
}
