export interface GroupInterface {
  value: string;
}

export interface PostInterface {
  category: string;
  id?: string | null;
  hash: string;
  title: string;
  img: string;
  description: string;
  status: string;
}

export type Status = "0" | "1" | "";
