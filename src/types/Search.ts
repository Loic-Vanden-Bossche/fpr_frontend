import { Identity } from ".";

export type SearchStatus = "APPROVED" | "REJECTED" | "PENDING"

export interface SearchResult extends Identity {
  status: SearchStatus;
}
