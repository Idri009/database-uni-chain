export type skill = {
name: string;
type: string;
level: string;
participants: number;
};

export type skillInfo = {
name: string;
description: string;
NFT: skill[];
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