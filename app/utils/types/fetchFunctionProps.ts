import { MovieBodyRequest } from "./movies";

export interface fetchFunctioProps {
    setGlobalError: (newError: boolean) => void;
    setGlobalLoading: (newLoad: boolean) => boolean;
    body?: MovieBodyRequest;
}
