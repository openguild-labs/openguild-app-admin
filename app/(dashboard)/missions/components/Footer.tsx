import { useAppSelector } from "@/redux/reduxHooks";
import { missionFooterStore } from "@/redux/slides/missionFooter";

function Footer() {
  const footerSlide = useAppSelector(missionFooterStore);

  return <>{footerSlide.footer}</>;
}

export default Footer;
