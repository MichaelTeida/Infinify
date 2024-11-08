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
    route: "/generator/add/image",
    icon: ImageIcon,
    available: false,
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
    label: "Image Restore",
    route: "/modifications/add/restore",
    icon: AutoFixHighIcon,
    available: true,
  },
  {
    label: "Background Remove",
    route: "/modifications/add/removeBackground",
    icon: WallpaperIcon,
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

export const tokenFee = -1;

export const modificationTypes = {
  fill: {
    type: "fill",
    title: "Generative Fill",
    description: "Fill in missing parts of your image",
    config: { fillBackground: true },
    icon: SettingsOverscanIcon,
  },
  remove: {
    type: "remove",
    title: "Object Remove",
    description: "Remove unwanted objects from your image",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: SearchOffIcon,
  },
  recolor: {
    type: "recolor",
    title: "Object Recolor",
    description: "Change the color of objects in your image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: PaletteIcon,
  },
  restore: {
    type: "restore",
    title: "Image Restore",
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
};

export const defaultValues = {
  title: "",
  aspectRatio: "",
  color: "",
  prompt: "",
  publicId: "",
};

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "16:9": {
    aspectRatio: "16:9",
    label: "Desktop format (16:9)",
    width: 1920,
    height: 1080,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};
