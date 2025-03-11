import StarIcon from "@mui/icons-material/Star";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
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
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export const navLinks = [
  {
    label: "Home",
    route: "/",
    icon: HomeIcon,
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
    label: "Image Restore",
    route: "/modifications/add/restore",
    icon: AutoFixHighIcon,
    available: true,
  },
  {
    label: "AI Chat",
    route: "/chat",
    icon: ChatIcon,
    available: true,
  },
  {
    label: "Image Generator",
    route: "/generator/add/image",
    icon: ImageIcon,
    available: false,
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

export const plans = [
  {
    _id: 1,
    name: "Free",
    icon: {
      main: AccountBalanceWalletIcon,
      iconIncluded: CheckIcon,
      iconNotIncluded: CloseIcon,
    },
    price: 0,
    tokens: 8,
    inclusions: [
      {
        label: "8 free tokens",
        isIncluded: true,
      },
      {
        label: "Standard access to services",
        isIncluded: true,
      },
      {
        label: "Priority support assistance",
        isIncluded: false,
      },
      {
        label: "Early access features",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: "Pro kit",
    icon: {
      main: StarIcon,
      iconIncluded: CheckIcon,
      iconNotIncluded: CloseIcon,
    },
    price: 20,
    tokens: 80,
    inclusions: [
      {
        label: "80 tokens",
        isIncluded: true,
      },
      {
        label: "Access to all services",
        isIncluded: true,
      },
      {
        label: "Priority support assistance",
        isIncluded: true,
      },
      {
        label: "Early access features",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: "Premium kit",
    icon: {
      main: RocketLaunchIcon,
      iconIncluded: CheckIcon,
      iconNotIncluded: CloseIcon,
    },
    price: 80,
    tokens: 640,
    inclusions: [
      {
        label: "640 tokens",
        isIncluded: true,
      },
      {
        label: "Access to all services",
        isIncluded: true,
      },
      {
        label: "Priority support assistance",
        isIncluded: true,
      },
      {
        label: "Early access features",
        isIncluded: true,
      },
    ],
  },
];

export const faqsPlan = [
  {
    icon: HelpOutlineIcon,
    question: "What are tokens?",
    answer:
      "Tokens are our platform's currency for accessing advanced AI features and generating creative content.",
  },
  {
    icon: AutoAwesomeIcon,
    question: "How do tokens work?",
    answer:
      "Each token represents a unit of AI processing power. Different tasks consume different amounts of tokens.",
  },
  {
    icon: TrendingUpIcon,
    question: "Can I upgrade later?",
    answer:
      "Absolutely! You can upgrade or purchase additional tokens at any time.",
  },
];
