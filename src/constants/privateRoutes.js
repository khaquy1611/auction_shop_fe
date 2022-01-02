import Wallet from "../screens/Wallet";
import ProfileEdit from "../screens/ProfileEdit";
import Security from "../screens/Security";
import Deposit from "../screens/Deposit";
import { PATH_ROUTES } from "./Path";
import Privacy from "../components/Privacy/index";
export const privateRoutes = [
  { path: PATH_ROUTES.wallet, component: Wallet },
  { path: PATH_ROUTES.profile_edit, component: ProfileEdit },
  { path: PATH_ROUTES.security, component: Security },
  { path: PATH_ROUTES.deposit, component: Deposit },
  { path: PATH_ROUTES.tern, component: Privacy },
];
