import background from "../static/background.png";

export default function Background() {
  return (
    <div
      className="absolute inset-0 bg-no-repeat bg-top bg-contain blur-sm scale-105"
      style={{ backgroundImage: `url(${background})` }}
    />
  );
}
