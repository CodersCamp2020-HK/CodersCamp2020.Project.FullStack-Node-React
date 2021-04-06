import React, { useContext, useState, useEffect } from 'react';
import GalleryPage from '../galleryPage/GalleryPage';
import { MemoryRouter, Route } from 'react-router';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { useGet } from 'restful-react';
import { useGetAnimals, GetAnimalsQueryParams, useGetForm } from '../../client/index';

interface Props {
    query: GetAnimalsQueryParams;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Gallery: React.FC<Props> = ({ query, currentPage, setCurrentPage }) => {
    // console.log('render gallery');
    const { data, loading } = useGetAnimals({ queryParams: { ...query, count: true } });
    const [pages, setPages] = useState(1);

    interface MyData {
        count: number;
    }

    useEffect(() => {
        if (data !== null) {
            setPages(Math.ceil(((data as unknown) as MyData).count / 6));
        }
    }, [data]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <div>
            <GalleryPage query={query} currentPage={currentPage} />
            <Route>
                {({ location }) => {
                    const query = new URLSearchParams(location.search);
                    const page = parseInt(query.get('page') || '1');
                    return (
                        <Pagination
                            color="primary"
                            page={currentPage}
                            count={pages}
                            defaultPage={1}
                            renderItem={(item) => (
                                <PaginationItem
                                    component={Link}
                                    to={`/${item.page === 1 ? '' : `?page=${item.page}`}`}
                                    {...item}
                                />
                            )}
                            onChange={handleChange}
                        />
                    );
                }}
            </Route>
        </div>
    );
};

export default Gallery;
