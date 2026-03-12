import { getPortfolioData } from "@/lib/data";
import { PortfolioProvider } from "@/lib/PortfolioContext";
import PortfolioPage from "@/components/PortfolioPage";

export default function Page() {
  const data = getPortfolioData();
  return (
    <PortfolioProvider data={data}>
      <PortfolioPage />
    </PortfolioProvider>
  );
}
