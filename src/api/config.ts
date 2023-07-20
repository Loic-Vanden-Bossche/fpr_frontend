import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const queriesConfiguration = (urlComplement?: string) => fetchBaseQuery({
  baseUrl: `https://api.flash-player-revival.net/api/${urlComplement ?? ''}`,
  prepareHeaders: (header) => {
    const token = localStorage.getItem('token');
    if (token) { header.set('authorization', `Bearer ${token}`); }
    return header;
  }
});
