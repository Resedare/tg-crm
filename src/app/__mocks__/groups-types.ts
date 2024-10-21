export interface GroupInterface {
  name: string;
}

export interface PostInterface {
  id: string;
  title: string;
  img: string;
  description: string;
  status: string;
}
export type Status = "all" | "0" | "1" | undefined | string;