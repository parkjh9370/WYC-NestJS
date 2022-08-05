export interface Location {
  latitude: string;
  longitude: string;
  roadAdd: string;
  lotAdd: string;
}

export interface SiteInfo {
  area: string;
  internet: string;
  parking: string;
  electronic: string;
  toilet: string;
}

export interface AddPostDTO {
  title: string;
  content: string;
  picture: string;
  location: Location;
  siteInfo: SiteInfo;
  rating: number;
}
