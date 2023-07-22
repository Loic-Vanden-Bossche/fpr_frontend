import { useGetProfileQuery } from "../../api";
import { Navigate, Outlet } from "react-router-dom";
import { form, page } from "./NotAuthenticated.style";
import { NotAuthenticatedHeader } from "./NotAuthenticated.Header";

export function NotAuthenticatedGuard() {
  const { isSuccess, isLoading } = useGetProfileQuery();

  if (isLoading) { return null; }
  else if (isSuccess) { return <Navigate to={"/"}/>; }
  return <section css={page}>
    <NotAuthenticatedHeader/>
    <main css={form}>
      <Outlet/>
    </main>
  </section>;
}
