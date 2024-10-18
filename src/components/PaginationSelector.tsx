import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationSelector({
  page,
  pages,
  onPageChange,
}: Props) {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => onPageChange(page - 1)}
            size={undefined}
          />
        </PaginationItem>
        {pageNumbers.map((number) => (
          <PaginationItem>
            <PaginationLink
              size={undefined}
              href="#"
              onClick={() => onPageChange(number)}
              isActive={page === number}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page !== pageNumbers.length && (
          <PaginationItem>
            <PaginationNext
              size={undefined}
              href="#"
              onClick={() => onPageChange(page + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
