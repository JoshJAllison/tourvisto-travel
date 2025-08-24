import { Link } from "react-router";
import {SidebarComponent} from "@syncfusion/ej2-react-navigations"

const MobileSidebar = () => {
    let sidebar: SidebarComponent

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

            {/*// @ts-ignore*/}
            <button onClick={() => sidebar.toggle()}>
                <img src="/assets/icons/menu.svg" alt="menu" className="size-7"/>
            </button>
        </header>

        <SidebarComponent
            width={270}
        >

        </SidebarComponent>
    </div>
  )
}

export default MobileSidebar