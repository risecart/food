"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Paginate({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const getPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const renderPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis className="hover:bg-accent " />
          </PaginationItem>
        );
      }

      return (
        <PaginationItem key={page}>
          <PaginationLink
            className={
              "hover:bg-accent cursor-pointer " +
              (page === currentPage ? " !bg-primary !text-white " : "")
            }
            onClick={() => getPageHref(page)}
            isActive={page === currentPage}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  function PaginationPrevious({
    className,
    ...props
  }: React.ComponentProps<typeof PaginationLink>) {
    return (
      <PaginationLink
        aria-label="Go to previous page"
        size="default"
        className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
        {...props}
      >
        <ChevronLeftIcon className="rtl:rotate-180" />
        <span className="hidden sm:block capitalize">
          {t("pagination_previous")}
        </span>
      </PaginationLink>
    );
  }

  function PaginationNext({
    className,
    ...props
  }: React.ComponentProps<typeof PaginationLink>) {
    return (
      <PaginationLink
        aria-label="Go to next page"
        size="default"
        className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
        {...props}
      >
        <span className="hidden sm:block capitalize">
          {t("pagination_next")}
        </span>
        <ChevronRightIcon className="rtl:rotate-180" />
      </PaginationLink>
    );
  }

  return (
    <Pagination className="mt-6">
      <PaginationContent className="gap-1">
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={() => getPageHref(Math.max(1, currentPage - 1))}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() => getPageHref(Math.min(totalPages, currentPage + 1))}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
