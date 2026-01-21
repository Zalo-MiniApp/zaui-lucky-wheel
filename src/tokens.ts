function deepMerge(target, source) {
  const result = { ...target };

  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

const base = {
  fontSize: {
    fs000: "10px",
    fs100: "11px",
    fs200: "12px",
    fs300: "13px",
    fs400: "14px",
    fs500: "15px",
    fs600: "16px",
    fs700: "17px",
    fs800: "18px",
    fs1400: "24px",
  },
  lineHeight: {
    lh000: "14px",
    lh100: "16px",
    lh200: "16px",
    lh300: "18px",
    lh400: "18px",
    lh500: "20px",
    lh600: "22px",
    lh800: "24px",
    lh1400: "30px",
    lh_full: "100%",
  },
  letterSpacing: {
    ls000: "0px",
    ls100: "0px",
    ls200: "0px",
    ls300: "0px",
    ls400: "0px",
    ls500: "0px",
    ls600: "0px",
    ls800: "0px",
    ls1400: "0px",
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    bold: "700",
  },
  fontFamily: {
    system: "Roboto, sans-serif",
  },
  colors: {
    black: "#000000",
    white: "#FFFFFF",
  },
  opacity: {
    opacity10: "0.1",
  },
  borderWidth: {
    divider01: "0.5px",
  },
  spacing: {
    19: "4.75rem",
    21: "5.25rem",
    90: "22.25rem",
  },
};

const semantic = {
  colors: {
    text: {
      primary: "#0D0D0D",
      dangerous: "#D72630",
    },
    layer: {
      layer_background_subtle: "#F7F7F8",
      layer_background_wheel: "#FBE2BC",
    },
    button: {
      primary: "#D72630",
    },
    component: {
      rule_note: {
        bg_from: "#FFA744",
        bg_to: "#FF8626",
      },
      voucher_card: {
        bg_from: "#FFA13B",
        bg_to: "#FF7B28",
        btn_from: "#FFE998",
        btn_to: "#FFC01A",
        btn_text: "#D65726",
      },
    },
  },
  fontSize: {
    title: [
      base.fontSize.fs700,
      {
        lineHeight: base.lineHeight.lh_full,
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.bold,
        fontFamily: base.fontFamily.system,
      },
    ],
    sub_title: [
      base.fontSize.fs500,
      {
        lineHeight: base.lineHeight.lh800,
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.bold,
        fontFamily: base.fontFamily.system,
      },
    ],
    x_small: [
      base.fontSize.fs200,
      {
        lineHeight: base.lineHeight.lh_full,
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.regular,
        fontFamily: base.fontFamily.system,
      },
    ],
    small: [
      base.fontSize.fs400,
      {
        lineHeight: base.lineHeight.lh400,
        letterSpacing: base.letterSpacing.ls400,
        fontWeight: base.fontWeight.regular,
        fontFamily: base.fontFamily.system,
      },
    ],
    normal_m: [
      base.fontSize.fs500,
      {
        lineHeight: base.lineHeight.lh200,
        letterSpacing: base.letterSpacing.ls000,
        fontWeight: base.fontWeight.medium,
        fontFamily: base.fontFamily.system,
      },
    ],
    large: [
      base.fontSize.fs600,
      {
        lineHeight: base.lineHeight.lh600,
        letterSpacing: base.letterSpacing.ls600,
        fontWeight: base.fontWeight.regular,
        fontFamily: base.fontFamily.system,
      },
    ],
    large_m: [
      base.fontSize.fs600,
      {
        lineHeight: base.lineHeight.lh600,
        letterSpacing: base.letterSpacing.ls600,
        fontWeight: base.fontWeight.medium,
        fontFamily: base.fontFamily.system,
      },
    ],
    xlarge_b: [
      base.fontSize.fs800,
      {
        lineHeight: base.lineHeight.lh800,
        letterSpacing: base.letterSpacing.ls800,
        fontWeight: base.fontWeight.bold,
        fontFamily: base.fontFamily.system,
      },
    ],
  },
};

const themeTokens = deepMerge(base, semantic);

export default themeTokens;
export { base, semantic };
