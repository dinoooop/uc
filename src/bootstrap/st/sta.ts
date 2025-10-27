import type { StaType } from "./interfaces";

const sta: StaType = {
  roles: [
    { label: "Admin", value: 1 },
    { label: "User", value: 2 },
  ],
  gender: [
    'male',
    'female',
    'other'
  ],
  regularStatus: [
    "active",
    "inactive",
    "pending"
  ],
  userStatus: [
    "active",
    "inactive",
    "banned"
  ],
  week: [
    { label: "Sun", value: 1 },
    { label: "Mon", value: 2 },
    { label: "Tue", value: 3 },
    { label: "Wed", value: 4 },
    { label: "Thu", value: 5 },
    { label: "Fri", value: 6 },
    { label: "Sat", value: 7 },
  ],
  month: [
    { label: "Jan", value: 1 },
    { label: "Feb", value: 2 },
    { label: "Mar", value: 3 },
    { label: "Apr", value: 4 },
    { label: "May", value: 5 },
    { label: "Jun", value: 6 },
    { label: "Jul", value: 7 },
    { label: "Aug", value: 8 },
    { label: "Sept", value: 9 },
    { label: "Oct", value: 10 },
    { label: "Nov", value: 11 },
    { label: "Dec", value: 12 },
  ],
  brands: [
    { label: "BMW", value: 1 },
    { label: "Toyota", value: 2 },
  ],
  socialMedia: [
    { label: "Facebook", key: "facebook", icon: "fa-facebook" },
    { label: "Twitter", key: "twitter", icon: "fa-twitter" },
    { label: "Instagram", key: "instagram", icon: "fa-instagram" },
    { label: "YouTube", key: "youtube", icon: "fa-youtube" },
    { label: "Linkedin", key: "linkedin", icon: "fa-linkedin" },
  ],
  crop: {
    default: {
      unit: "px",
      x: 25,
      y: 25,
      width: 50,
      height: 50,
    },
    banner_image: {
      unit: "px",
      x: 25,
      y: 25,
      width: 300,
      height: 130,
    },
  },
  resize: {
    avatar: [
      { name: "thumb", width: 50, height: 50 },
      { name: "cover", width: 350, height: 350 },
    ],
    service_image: [
      { name: "thumb", width: 50, height: 50 },
      { name: "cover", width: 350, height: 350 },
    ],
    banner_image: [
      { name: "thumb", width: 30, height: 15 },
      { name: "cover", width: 300, height: 150 },
    ],
    logo: [
      { name: "thumb", width: 50, height: 50 },
      { name: "cover", width: 350, height: 350 },
    ],
  },
};

export default sta;
