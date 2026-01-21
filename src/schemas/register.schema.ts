import * as v from "valibot";

const sexSchema = v.picklist(["male", "female", "other"]);

const jobSchema = v.picklist(["student", "worker", "freelancer", "other"]);

export const registerSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, "Tên của bạn là bắt buộc")),
  phone: v.pipe(
    v.string(),
    v.minLength(1, "Số điện thoại là bắt buộc"),
    v.trim(),
    v.regex(/^(0|\+84)(3|5|7|8|9)\d{8}$/, "Số điện thoại không hợp lệ")
  ),
  sex: sexSchema,
  job: jobSchema,
});

export type TRegisterValues = v.InferOutput<typeof registerSchema>;
