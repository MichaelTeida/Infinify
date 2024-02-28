import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import ImageIcon from "@mui/icons-material/Image";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import PaletteIcon from "@mui/icons-material/Palette";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export const navLinks = [
  {
    label: "Home",
    route: "/",
    icon: HomeIcon,
    available: true,
  },
  {
    label: "AI Chat",
    route: "/chat",
    icon: ChatIcon,
    available: false,
  },
  {
    label: "Image Generator",
    route: "/generator/add/restore",
    icon: ImageIcon,
    available: false,
  },
  {
    label: "Image Upscale",
    route: "/modifications/add/upscale",
    icon: AutoFixHighIcon,
    available: true,
  },
  {
    label: "Background Remove",
    route: "/modifications/add/removeBackground",
    icon: WallpaperIcon,
    available: true,
  },
  {
    label: "Generative Fill",
    route: "/modifications/add/fill",
    icon: SettingsOverscanIcon,
    available: true,
  },
  {
    label: "Object Remove",
    route: "/modifications/add/remove",
    icon: SearchOffIcon,
    available: true,
  },
  {
    label: "Object Recolor",
    route: "/modifications/add/recolor",
    icon: PaletteIcon,
    available: true,
  },
  {
    label: "Profile",
    route: "/profile",
    icon: AccountCircleIcon,
    available: true,
  },
  {
    label: "Buy Credits",
    route: "/tokens",
    icon: AccountBalanceWalletIcon,
    available: true,
  },
];
