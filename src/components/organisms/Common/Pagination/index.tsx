import React from 'react';
import { GrPrevious, GrNext } from 'react-icons/gr';

import styles from './styles.module.scss';

interface PaginationProps {
    currentPage: number;
    setPage: (page: number) => void;
    pageCount: number;
    setFirstView: (firstView: boolean) => void;
}

function PaginationComponent({ currentPage, setPage, pageCount, setFirstView }: PaginationProps) {
    // 페이지 변경 핸들러
    const changePage = (newPage: number) => {
        if (newPage >= 0 && newPage < pageCount) {
            setPage(newPage);
        }
    };

    return (
        <div className={styles.container}>
            <button
                className={`${styles.button} ${
                    currentPage === 0 ? styles.disabled : styles.active
                }`}
                onClick={() => {
                    changePage(currentPage - 1);
                    setFirstView(false);
                }}
                disabled={currentPage === 0}
            >
                prev
                <GrPrevious />
            </button>

            <div>
                <span>{currentPage + 1}</span>
                <span> / </span>
                <span>{pageCount}</span>
            </div>

            <button
                className={`${styles.button} ${
                    currentPage === pageCount - 1 ? styles.disabled : styles.active
                }`}
                onClick={() => {
                    changePage(currentPage + 1);
                    setFirstView(false);
                }}
                disabled={currentPage === pageCount - 1}
            >
                <GrNext />
                next
            </button>
        </div>
    );
}

export default PaginationComponent;
