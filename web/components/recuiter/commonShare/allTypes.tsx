export type skill = {
  rank: number;
  name: string;
  role: string;
  candidates: number;
  certificates: number;
};

export type school ={
    rank: number;
    name: string; 
    role: string;
    candidates: number;
    certificates: number;
}

export type candidate = {
  rank: number;
  name: string;
  role: string;
  score: number;
  NFT: NFTDetail[];
};

export type NFTDetail = {
  name: string;
  ownerAddress: string;
  type: string;
  status: string;
  issuer: string;
  issueDate: string;
  expiredDate: string;
  contractAddress: string;
  description: string;
  skills: string[];
};
