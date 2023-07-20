import { Navigate, Outlet } from "react-router-dom";
import { useGetProfileQuery } from "../../api";
import { authForm, authPage } from "./Auth.style";
import { AuthHeader } from "./Auth.Header";

interface Props {
  shouldBeAuthenticated?: boolean
}

export function AuthGuard({ shouldBeAuthenticated = false }: Props) {
  const { isError } = useGetProfileQuery();

  if (shouldBeAuthenticated == isError) { return <Navigate to={`/${shouldBeAuthenticated ? "auth/login" : ""}`}/>; }

  if(!shouldBeAuthenticated) {
    return <section css={authPage}>
      <AuthHeader/>
      <main css={authForm}>
        <Outlet/>
      </main>
    </section>;
  }

  return <Outlet/>;
}
