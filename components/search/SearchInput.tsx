"use client";

import { forwardRef, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "../ui/loading-spinner";
import { Kbd } from "../ui/kbd";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SearchInputProps extends React.ComponentProps<"input"> {
  onClearValue?: () => void;
  loading?: boolean;
  textClear?: string;
}

function getSearchShortcutKey(): string {
  const nav = navigator as Navigator & { userAgentData?: { platform: string } };
  if (nav.userAgentData?.platform) {
    return nav.userAgentData.platform.toLowerCase().includes("mac")
      ? "⌘"
      : "Ctrl";
  }
  return navigator.userAgent.toLowerCase().includes("mac") ? "⌘" : "Ctrl";
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClearValue, loading, textClear, value, ...rest }, ref) => {
    // Memoize the shortcut key so it's not recalculated every render
    const shortcutKey = useMemo(() => getSearchShortcutKey(), []);
      const { t } = useTranslation();

    return (
      <div className="w-full">
        <Input
          prefixElement={
            loading && value !== "" ? <LoadingSpinner className="text-primary" /> :<div className="w-6 text-gray-500">
              <Search/>
            </div>
          }
                  placeholder={t("enter_prod_name")}

          ref={ref}
          type="text"
          value={value}
          {...rest}
          suffix={
            value ? (
              <span
                onClick={onClearValue}
                className="text-sm text-gray-500 cursor-pointer hover:text-red-600"
                title="Clear search"
                role="button"
              >
                {textClear}
              </span>
            ) : (
              <div>
                <Kbd>{shortcutKey}</Kbd> + <Kbd>F</Kbd>
              </div>
            )
          }
        />
      </div>
    );
  }
);

export default SearchInput;
