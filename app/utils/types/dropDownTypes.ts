export interface DropDownProps {
    title: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    arr?: SubLink[];
}

export interface SubLink {
    title: string;
    link: string;
}
