export interface OptionItem {
    label: string;
    value: number | string;
}

export interface SocialMediaItem {
  label: string;
  key: string;
  icon: string;
}

export interface CropConfig {
  unit: 'px' | '%';
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ResizeItem {
  name: string;
  width: number;
  height: number;
}

export interface StaType {
  roles: OptionItem[];
  gender: string[];
  regularStatus: string[];
  userStatus: string[];
  week: OptionItem[];
  month: OptionItem[];
  brands: OptionItem[];
  socialMedia: SocialMediaItem[];
  crop: {
    default: CropConfig;
    banner_image: CropConfig;
    [key: string]: CropConfig;
  };
  resize: {
    avatar: ResizeItem[];
    service_image: ResizeItem[];
    banner_image: ResizeItem[];
    logo: ResizeItem[];
    [key: string]: ResizeItem[];
  };
}