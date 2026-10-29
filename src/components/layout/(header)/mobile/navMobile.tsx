import { navItems } from "@/types/header/navbar";
import { Fragment } from "react/jsx-runtime";
import { NavBtn } from "../navButton";
import { NavDropdownMobile } from "../dropdown";

export function NavMobile() {
    return (
        <div className="flex flex-col gap-2">
            {navItems.navItems.map((navItem) => (
                <Fragment key={navItem.id}>
                    <NavBtn navItem={navItem} type="mobile" />
                    <NavDropdownMobile
                        dropdownItems={navItem.dropdownItems}
                        navId={navItem.id}
                    />
                </Fragment>
            ))}
        </div>
    );
}
