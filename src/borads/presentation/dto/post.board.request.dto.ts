import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddPostDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  picture: string;

  @IsNotEmpty()
  location: Location;

  @IsNotEmpty()
  siteInfo: SiteInfo;

  @IsNumber()
  @IsNotEmpty()
  rating: number;
}

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
