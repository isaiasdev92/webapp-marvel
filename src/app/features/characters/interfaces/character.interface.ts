export interface Characters {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: DataCharacter;
}

export interface DataCharacter {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ResultCharacter[];
}

export interface ResultCharacter {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: ThumbnailCharacter;
  resourceURI: string;
  comics: Comics;
  series: Comics;
  stories: Stories;
  events: Comics;
  urls: URL[];
}

export interface Comics {
  available: number;
  collectionURI: string;
  items: ComicsItem[];
  returned: number;
}

export interface ComicsItem {
  resourceURI: string;
  name: string;
}

export interface Stories {
  available: number;
  collectionURI: string;
  items: StoriesItem[];
  returned: number;
}

export interface StoriesItem {
  resourceURI: string;
  name: string;
  type: string;
}

export interface ThumbnailCharacter {
  path: string;
  extension: string;
}
