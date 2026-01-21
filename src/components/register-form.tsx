import { PATHS } from "@/constants/path";
import { registerSchema } from "@/schemas/register.schema";
import { userService } from "@/services/user.services";
import { usePermissionStore } from "@/stores/permission";
import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import { Button, Input, Select, useNavigate, useSnackbar } from "zmp-ui";
import Divider from "./divider";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { hasUserInfo, hasUserPhoneNumber, isRequested, request } =
    usePermissionStore();
  const { openSnackbar } = useSnackbar();

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      sex: "male",
      job: "student",
    },
    validators: {
      onChange: registerSchema,
    },
    onSubmit: ({ value }) => {
      navigate(PATHS.REWARD);
    },
  });

  const handleAutoFillRequest = async () => {
    if (isRequested || (hasUserInfo && hasUserPhoneNumber)) return;
    const activeElement = document.activeElement as HTMLElement | null;
    activeElement?.blur();
    await request();
  };

  useEffect(() => {
    if (hasUserPhoneNumber == false) return;
    (async () => {
      try {
        const phone = await userService.getPhoneNumber();
        form.setFieldValue("phone", phone);
      } catch (error) {
        openSnackbar({
          icon: true,
          type: "success",
          text: "Nhà phát triển tự cài đặt tính năng tự động điền số điện thoại tại userService",
          duration: 5000,
        });
        form.setFieldValue("phone", "0311111111");
      }
    })();
  }, [hasUserPhoneNumber]);

  useEffect(() => {
    if (hasUserInfo == false) return;
    (async () => {
      try {
        const name = await userService.getUserName();
        form.setFieldValue("name", name);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [hasUserInfo]);

  const renderError = (errors: Array<{ message?: string } | undefined>) => {
    if (errors.length === 0) {
      return null;
    }

    const messages = errors.map((err) => err?.message).filter(Boolean);
    if (messages.length === 0) {
      return null;
    }

    return (
      <p className="text-small text-text-dangerous">{messages.join(",")}</p>
    );
  };

  const renderRequiredLabel = (label: string) => (
    <div className="text-small">
      {label} <span className="text-text-dangerous">*</span>
    </div>
  );

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col p-4 gap-2"
      >
        <div className="rounded-lg bg-white p-4 flex flex-col gap-3">
          <div className="text-text-primary text-sub_title">
            Thông tin cơ bản
          </div>
          <Divider />
          <form.Field name="name">
            {(field) => (
              <div>
                <Input
                  size="medium"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  label={renderRequiredLabel("Tên của bạn")}
                  onClick={() => {
                    handleAutoFillRequest();
                  }}
                />
                {renderError(field.state.meta.errors)}
              </div>
            )}
          </form.Field>
          <form.Field name="phone">
            {(field) => (
              <div>
                <Input
                  size="medium"
                  type="tel"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  label={renderRequiredLabel("Số điện thoại")}
                  onClick={() => {
                    handleAutoFillRequest();
                  }}
                />
                {renderError(field.state.meta.errors)}
              </div>
            )}
          </form.Field>
          <form.Field name="sex">
            {(field) => (
              <div>
                <Select
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value as string)}
                  label={renderRequiredLabel("Giới tính")}
                >
                  <Select.Option title="Nam" value="male" />
                  <Select.Option title="Nữ" value="female" />
                  <Select.Option title="Khác" value="other" />
                </Select>
                {renderError(field.state.meta.errors)}
              </div>
            )}
          </form.Field>
        </div>
        <div className="rounded-lg bg-white p-4 flex flex-col gap-3">
          <div className="text-text-primary text-sub_title">Thông tin phụ</div>
          <Divider />
          <form.Field name="job">
            {(field) => (
              <div>
                <Select
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value as string)}
                  label={renderRequiredLabel("Nghề nghiệp")}
                >
                  <Select.Option title="Sinh viên" value="student" />
                  <Select.Option title="Công nhân" value="worker" />
                  <Select.Option title="Freelancer" value="freelancer" />
                  <Select.Option title="Khác" value="other" />
                </Select>
                {renderError(field.state.meta.errors)}
              </div>
            )}
          </form.Field>
        </div>
        <Button
          htmlType="submit"
          className="!bg-button-primary !text-white text-normal_m"
        >
          Tham Gia Ngay
        </Button>
      </form>
    </>
  );
}
