type TypeVideos = {
  key: string;
  response_id: string;
};

type Photo = {
  uri: string;
  key: string;
};

export type TypeProducts = {
  songID: number;
  id: number;
  userID: string;
  recipeID: number;
  name: string;
  videos: TypeVideos[];
  description: string;
  date: string;
  recipeName: string;
  discount: number;
  cover: string;
  price: string;
  categoriesID: string;
  verify: number;
  avatar: string;
  username: string;
  business_name: string;
  latitude: string | null;
  longitude: string | null;
  details: string;
  ordenable: boolean;
  follower_count?: string;
  video: string;
  photos: Photo[];
  mediaType: number;
  topics: string;
  tags: string;
  hashtag: string;
  ProfileName: string;
  businessID: number;
  followed: boolean;
};
