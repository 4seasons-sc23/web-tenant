// PaginationComponent.tsx
import React from 'react';

interface PaginationProps {
    currentPage: number;
    setPage: (page: number) => void;
    pageCount: number;
}

function PaginationComponent({ currentPage, setPage, pageCount }: PaginationProps) {
    // 페이지 변경 핸들러
    const changePage = (newPage: number) => {
        if (newPage >= 0 && newPage < pageCount) {
            setPage(newPage);
        }
    };

    return (
        <div>
            {/* 이전 페이지 버튼 */}
            <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 0}>
                이전
            </button>

            {/* 현재 페이지 표시 */}
            <span>{currentPage + 1}</span>
            <span> / </span>
            <span>{pageCount}</span>

            {/* 다음 페이지 버튼 */}
            <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === pageCount - 1}
            >
                다음
            </button>
        </div>
    );
}

export default PaginationComponent;
