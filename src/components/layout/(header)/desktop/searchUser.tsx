import { useUserStatus } from "@/store/status";
import { Search } from "../search";
import { ConnectBtn, ErrorBtn, LoadingBtn } from "../userBtns";

export function SearchUser() {
    const { isUserLoading, isUserError } = useUserStatus();

    return (
        <div className="hidden items-center gap-4 lg:flex">
            <Search />
            {isUserLoading ? (
                <LoadingBtn />
            ) : isUserError ? (
                <ErrorBtn />
            ) : (
                <ConnectBtn />
            )}
        </div>
    );
}
