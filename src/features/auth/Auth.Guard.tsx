import { Navigate, Outlet } from "react-router-dom";
import { useGetProfileQuery } from "../../api";

interface Props {
  shouldBeAuthenticated?: boolean
}

export function AuthGuard({ shouldBeAuthenticated = false }: Props) {
  const { isError } = useGetProfileQuery();
  if (shouldBeAuthenticated === isError) { return <Navigate to={`/${shouldBeAuthenticated ? "auth/login" : ""}`}/>; }
  return <Outlet/>;
}
