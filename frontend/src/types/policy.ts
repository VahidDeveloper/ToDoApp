export type Policy = {
  groupname: string;
  policies: string[];
};

export interface PolicyResponse {
  result: Policy[];
  status: string;
}