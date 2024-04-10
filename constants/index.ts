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
];

export const navControlLinks = [
  {
    label: "Profile",
    route: "/profile",
    icon: AccountCircleIcon,
    available: true,
  },
  {
    label: "Buy Tokens",
    route: "/tokens",
    icon: AccountBalanceWalletIcon,
    available: true,
  },
];

export const modificationTypes = {
  restore: {
    type: "restore",
    title: "Image Upscale",
    description: "Enhance image quality by reducing noise and correcting flaws",
    config: { restore: true },
    icon: AutoFixHighIcon,
  },
  removeBackground: {
    type: "removeBackground",
    title: "Background Remove",
    description: "Easily remove background from your image",
    config: { removeBackground: true },
    icon: WallpaperIcon,
  },
  fill: {
    type: "fill",
    title: "Generative Fill",
    subTitle: "Fill in missing parts of your image",
    config: { fillBackground: true },
    icon: SettingsOverscanIcon,
  },
  remove: {
    type: "remove",
    title: "Object Remove",
    subTitle: "Remove unwanted objects from your image",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: SearchOffIcon,
  },
  recolor: {
    type: "recolor",
    title: "Object Recolor",
    subTitle: "Change the color of objects in your image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: PaletteIcon,
  },
};
