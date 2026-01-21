import SlotMachine from "@/components/slot-machine";
import { LineSVG } from "@/components/vectors";
import EffectImg from "@/static/lucky-wheel/effect.png";
import luckyWheelBgImg from "@/static/lucky-wheel/lucky-wheel-bg.png";
import LuckyWheelImg from "@/static/lucky-wheel/lucky-wheel.png";
import MiddleGroupImg from "@/static/lucky-wheel/middle.png";
import TopGroupImg from "@/static/lucky-wheel/top.png";
import { cn } from "@/utils/cn";
import { Page } from "zmp-ui";

export default function WheelPage() {
  return (
    <Page
      hideScrollbar
      className="relative overflow-y-scroll overflow-x-hidden bg-layer-layer_background_wheel"
    >
      <div
        className="absolute inset-0 bg-no-repeat bg-top bg-contain blur-sm scale-105"
        style={{ backgroundImage: `url(${luckyWheelBgImg})` }}
      />
      <DecorSection />
      <div className="relative m-4">
        <TitleSection />
        <WheelSection />
        <RuleNoteSection />
      </div>
    </Page>
  );
}

function TitleSection() {
  return (
    <div className="flex flex-col items-center mt-20">
      <div className="font-black italic text-xl text-white">BigG</div>
      <div className="font-black text-center text-5xl bg-gradient-to-b from-white to-[#FFEED2] bg-clip-text text-transparent">
        VÒNG QUAY MAY MẮN
      </div>
      <div className="text-large text-white">9-9 Nhiều giải thưởng bất ngờ</div>
    </div>
  );
}

function RuleNoteSection() {
  return (
    <div className="bg-gradient-to-b p-4 from-component-rule_note-bg_from to-component-rule_note-bg_to rounded-lg">
      <div className="flex justify-between items-center px-8">
        <LineSVG height={2} />
        <div className="text-xlarge_b text-white">Thể lệ tham gia</div>
        <LineSVG height={2} reverseX />
      </div>

      <div className="text-white text-small">
        <p>
          Thể lệ vòng quay may mắn bao gồm: người chơi thực hiện hành động (quay
          nút/nhập mã) để khởi động cơ chế quay số ngẫu nhiên, và kết quả vòng
          quay dừng lại ở ô nào sẽ mang về phần thưởng tương ứng. Các lượt quay
          có thể được tặng miễn phí hàng ngày, hoặc kiếm thêm bằng cách thực
          hiện nhiệm vụ như chia sẻ chương trình lên mạng xã hội.
        </p>
        <div>
          <p className="font-semibold">1. Cơ chế hoạt động chung</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Cơ chế xác suất:</strong> Vòng quay được chia thành nhiều
              phần, mỗi phần là một phần thưởng hoặc kết quả khác nhau.
            </li>
            <li>
              <strong>Thao tác:</strong> Người chơi thực hiện thao tác quay
              (nhấn nút hoặc quay tay).
            </li>
            <li>
              <strong>Nhận thưởng:</strong> Vòng quay dừng lại ở ô nào thì người
              chơi sẽ nhận phần quà tại ô đó.
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">2. Cách nhận lượt quay</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>
              <strong>Tặng miễn phí:</strong>
              <p className="mt-1">
                Người chơi thường nhận được một số lượt quay ban đầu, ví dụ như
                khi đăng nhập lần đầu hoặc mỗi ngày.
              </p>
            </li>

            <li>
              <strong>Hoàn thành nhiệm vụ:</strong>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Chia sẻ chương trình lên Facebook.</li>
                <li>Mời bạn bè tham gia thông qua link giới thiệu.</li>
                <li>
                  Thực hiện các nhiệm vụ khác được hiển thị trong game hoặc ứng
                  dụng.
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">3. Các yếu tố quan trọng khác</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Xác suất minh bạch:</strong> Đơn vị tổ chức hoàn toàn có
              thể cài đặt xác suất cho mỗi ô để phân bổ phần thưởng một cách
              công bằng.
            </li>
            <li>
              <strong>Theo dõi lịch sử:</strong> Người chơi có thể xem lại kết
              quả các lượt quay của mình trong mục “Lịch sử”.
            </li>
            <li>
              <strong>Mục đích:</strong> Vòng quay may mắn thường được sử dụng
              trong các chiến dịch marketing, sự kiện quảng bá để thu hút sự
              quan tâm và tương tác của người dùng.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function WheelSection() {
  return (
    <div className="flex flex-col items-center relative">
      <img src={LuckyWheelImg} alt="" className="h-80 aspect-square" />
      <div className="absolute top-16 pr-1">
        <SlotMachine />
      </div>
    </div>
  );
}

function DecorSection() {
  const defaultClass = "absolute inset-0";

  return (
    <>
      <img className={cn(defaultClass, "absolute inset-0")} src={TopGroupImg} />
      <img
        className={cn(defaultClass, "absolute top-56 scale-150")}
        src={EffectImg}
      />
      <img
        className={cn(defaultClass, "absolute top-90 z-10 pointer-events-none")}
        src={MiddleGroupImg}
      />
    </>
  );
}
