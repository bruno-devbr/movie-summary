export interface DropDownProps {
    title: string;
    arr: SubLink[];
}

export interface SubLink {
    title: string;
    link: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
