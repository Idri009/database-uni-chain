type skill = {
  name: string;
  type: string;
  level: string;
  participants: number;
};

export type school = {
  name: string;
  logoUrl: string;
  address: string;
  NFT: skill[];
  participants: number;
  description: string;
  skills: number;
};
