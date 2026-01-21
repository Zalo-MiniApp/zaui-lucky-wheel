import { PATHS } from "@/constants/path";
import { AnimationRoutes, Route, ZMPRouter } from "zmp-ui";
import HomePage from "./pages/home";
import RewardPage from "./pages/reward";
import VoucherPage from "./pages/voucher";
import WheelPage from "./pages/wheel";

const routes = [
  { path: PATHS.HOME, element: <HomePage /> },
  { path: PATHS.REWARD, element: <RewardPage /> },
  { path: PATHS.WHEEL, element: <WheelPage /> },
  { path: PATHS.VOUCHER, element: <VoucherPage /> },
];

export default function AppRouter() {
  return (
    <ZMPRouter>
      <AnimationRoutes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </AnimationRoutes>
    </ZMPRouter>
  );
}
