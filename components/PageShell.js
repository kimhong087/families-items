import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

// Header + page body + footer for every page except the auth split screens.
export default function PageShell({ children }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
