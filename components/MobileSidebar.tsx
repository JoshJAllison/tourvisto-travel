import { Link } from "react-router";
import type {SidebarComponent} from "@syncfusion/ej2-react-navigations"

const MobileSidebar = () => {
    const sidebar: SidebarComponent

  return (
    <div className="mobile-sidebar wrapper">
        <header>
            <Link to="/">
                <img
                    src="/assets/icons/logo.svg"
                    alt="logo"
                    className="size-[30px]"
                />

                <h1>Tourvisto</h1>
            </Link>

            <button onClick={() => }></button>
        </header>
    </div>
  )
}

export default MobileSidebar