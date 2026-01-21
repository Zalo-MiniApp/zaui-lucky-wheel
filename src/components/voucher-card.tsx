import VoucherImg from "@/static/voucher.png";

export default function VoucherCard() {
  return (
    <div className="flex items-center w-full justify-between bg-gradient-to-b from-component-voucher_card-bg_from to-component-voucher_card-bg_to px-3 py-5 rounded-xl">
      <div className="flex gap-2">
        <img src={VoucherImg} alt="" className="aspect-square" />
        <div className="flex flex-col items-center justify-center">
          <div className="!text-white text-large-m">Voucher 500.000đ</div>
          <div className="!text-white/65 text-x_small">
            HSD đến hết 29-9-2025
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-component-voucher_card-btn_from text-small to-component-voucher_card-btn_to py-2 px-4 rounded-2xl text-component-voucher_card-btn_text">
        Dùng ngay
      </div>
    </div>
  );
}
