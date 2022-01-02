import Seach404 from "../components/search404/index";
import Shop from "../components/Shop/index";
import Activity from "../screens/Activity";
import Auction from "../screens/Auction";
import ConnectWallet from "../screens/ConnectWallet";
import DropendsComponent from "../screens/Dropends/index";
import ComingSoon from "../screens/Event/index";
import Faq from "../screens/Faq";
import FiatDeposit from "../screens/FiatDeposit";
import Home from "../screens/Home";
import Item from "../screens/Item";
import MarketPlace from "../screens/MarketPlace";
import MoonPayResult from "../screens/MoonPayResult";
import PageList from "../screens/PageList";
import Profile from "../screens/Profile";
import Search from "../screens/Search/index";
import Search02 from "../screens/Search02";
import SignOut from "../screens/SignOut";
import SignUp from "../screens/SignUp";
import UpComincgDrops from "../screens/UpComingDrops/index";
import Closing from "../screens/Closing/index";
import UploadDetails from "../screens/UploadDetails";
import UploadVariants from "../screens/UploadVariants";
import WithDraw from "../screens/WithDraw";
import TermAndCondition from "../screens/TermAndCondition";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import { PATH_ROUTES } from "./Path";

export const appRoutes = [
  { path: PATH_ROUTES.default, component: Home },
  { path: PATH_ROUTES.signUp, component: SignUp },
  { path: PATH_ROUTES.signOut, component: SignOut },
  { path: PATH_ROUTES.uploadVariants, component: UploadVariants },
  { path: PATH_ROUTES.uploadDetails, component: UploadDetails },
  { path: PATH_ROUTES.connectWallet, component: ConnectWallet },
  { path: PATH_ROUTES.faq, component: Faq },
  { path: PATH_ROUTES.activity, component: Activity },
  { path: PATH_ROUTES.marketplace, component: MarketPlace },
  { path: PATH_ROUTES.auction, component: Auction },
  { path: PATH_ROUTES.search02, component: Search02 },
  { path: PATH_ROUTES.item, component: Item },
  { path: PATH_ROUTES.pagelist, component: PageList },
  { path: PATH_ROUTES.withdraw, component: WithDraw },
  { path: PATH_ROUTES.fiatdeposit, component: FiatDeposit },
  { path: PATH_ROUTES.moonpayresult, component: MoonPayResult },
  { path: PATH_ROUTES.shop, component: Shop },
  { path: PATH_ROUTES.upcomingdrops, component: UpComincgDrops },
  { path: PATH_ROUTES.dropends, component: DropendsComponent },
  { path: PATH_ROUTES.profile, component: Profile },
  { path: PATH_ROUTES.search404, component: Seach404 },
  { path: PATH_ROUTES.search, component: Search },
  { path: PATH_ROUTES.Event, component: ComingSoon },
  { path: PATH_ROUTES.closing, component: Closing },
  { path: PATH_ROUTES.TermAndCondition, component: TermAndCondition },
  { path: PATH_ROUTES.PrivacyAndPolicy, component: PrivacyPolicy },
];
